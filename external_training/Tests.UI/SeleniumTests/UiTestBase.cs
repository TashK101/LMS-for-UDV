
using external_training.Tests.UI.Helpers;
using external_training.Tests.UI.PageObjects.Pages.MainPage;
using external_training.Tests.UI.SeleniumCore;
using external_training.Tests.UI.SeleniumCore.Page;
using NUnit.Framework;
using NUnit.Framework.Interfaces;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

namespace external_training.Tests.UI.SeleniumTests;

[Parallelizable(ParallelScope.Fixtures)]
public class UiTestBase
{
    protected ChromeDriver driver;
    
    [SetUp]
    public void SetUp()
    {
        var options = new ChromeOptions();
        options.SetLoggingPreference(LogType.Browser, LogLevel.All); 
        options.SetLoggingPreference(LogType.Performance, LogLevel.Severe);
        options.AddArgument("--window-size=1920,1080");
        
        driver = new ChromeDriver(options);
        driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(10);
        
        SetNetworkManager();
    }

    [TearDown]
    public void AfterTestFinished()
    {
        var testStatus = TestContext.CurrentContext.Result.Outcome;
        if (testStatus == ResultState.Failure || testStatus == ResultState.Error)
        {
            var testName = TestContext.CurrentContext.Test.Name;
            
            var path = Path.Combine(AppContext.BaseDirectory, "TestResults");
            Directory.CreateDirectory(Path.Combine(AppContext.BaseDirectory, "TestResults"));

            SaveScreenshot(path, testName);
            //SaveLogs();
        }
        
        driver.Dispose();
    }

    private void SaveLogs()
    {
        var logs = driver.Manage().Logs.GetLog(LogType.Browser);
        foreach (LogEntry logEntry in logs)
        {
            TestContext.Out.WriteLine(logEntry.Message);
        }

        TestContext.Out.WriteLine("\n\n");
        logs = driver.Manage().Logs.GetLog(LogType.Performance);
        foreach (LogEntry logEntry in logs)
        {
            TestContext.Out.WriteLine(logEntry.Message);
        }
    }

    private void SaveScreenshot(string path, string testName)
    {
        var screenshot = driver.GetScreenshot();
        var screenshotPath = $"{path}\\{testName}.png";
        screenshot.SaveAsFile(screenshotPath);

        TestContext.Out.WriteLine($"\n\nScreenshot saved to {screenshotPath}\n\n");
    }

    protected async Task<MainPage> OpenBookListPage(string? userEmail = null, string? userPassword = null, bool withCreateUser = true)
    {
        userEmail ??= StringGenerator.GetEmail();
        userPassword ??= StringGenerator.GetValidPassword();

        if (withCreateUser) AuthHelper.CreateUserAndGetTokenAsync(userEmail, userPassword);
        
        AuthHelper.LoginUserAsync(userEmail, userPassword, driver);

        var booksPage = driver.GoToPage<MainPage>();
        return booksPage;
    }
    
    protected async Task<BookPage> OpenBookPage(string bookTitle, string? userEmail = null, string? userPassword = null, bool withCreateUser = true)
    {
        userEmail ??= StringGenerator.GetEmail();
        userPassword ??= StringGenerator.GetValidPassword();

        if (withCreateUser) AuthHelper.CreateUserAndGetTokenAsync(userEmail, userPassword);
        
        AuthHelper.LoginUserAsync(userEmail, userPassword, driver);

        var page = (BookPage)Activator.CreateInstance(typeof(BookPage), driver, bookTitle)!;
        var url = $"{page.BaseUrl}/{page.Url}";
        driver.Navigate().GoToUrl(url);
        page.WaitLoaded();
        return page;
    }

    private void SetNetworkManager()
    {
        var networkManager = new NetworkManager(driver);
        networkManager.NetworkResponseReceived += ResponseHandler;
        networkManager.StartMonitoring();

        void ResponseHandler(object? sender, NetworkResponseReceivedEventArgs e)
        {
            if (e.ResponseStatusCode >= 300)
                TestContext.Out.WriteLine(
                    $"Http status: {e.ResponseStatusCode} : {e.ResponseBody} | Url: {e.ResponseUrl} ");
        }
    }
}
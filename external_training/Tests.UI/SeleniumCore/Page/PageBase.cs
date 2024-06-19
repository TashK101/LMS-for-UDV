using external_training.Tests.UI.Helpers;
using external_training.Tests.UI.SeleniumCore.Controls;
using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;

namespace external_training.Tests.UI.SeleniumCore.Page;

public abstract class PageBase : IPage
{
    protected PageBase(IWebDriver driver) => _driver = driver;
    protected readonly IWebDriver _driver;
    public abstract string Url { get; }
    public abstract string Title { get; }

    public virtual void WaitLoaded()
    {
        try
        {
            var wait = new WebDriverWait(_driver, TimeSpan.FromSeconds(10));
            wait.Until(ExpectedConditions.TitleIs(Title));
        }
        catch (TimeoutException ex)
        {
            throw new TimeoutException($"Не дождались загрузки страницы {BaseUrl}/{Url}: " + ex.Message);
        }
    }

    public void Refresh()
    {
        _driver.Navigate().Refresh();
        WaitLoaded();
    }

    public string BaseUrl => "http://localhost:5000";

    protected TControl Find<TControl>(By by, ISearchContext? context = null) where TControl : class, IControl
    {
        return (TControl)Activator.CreateInstance(typeof(TControl), context ?? _driver, by);
    }
}

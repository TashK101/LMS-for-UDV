//using Newtonsoft.Json;

using external_training.Tests.UI.PageObjects.Pages;
using OpenQA.Selenium;
using OpenQA.Selenium.Support.Extensions;
using external_training.Tests.UI.SeleniumCore;

namespace external_training.Tests.UI.Helpers;

public static class AuthHelper
{
    private static void LoginUserAsync(IWebDriver driver, string token)
    {
        driver.GoToPage<LoginPage>();
        driver.ExecuteJavaScript($"localStorage.setItem('jwtToken','\"{token}\"');");
    }
}
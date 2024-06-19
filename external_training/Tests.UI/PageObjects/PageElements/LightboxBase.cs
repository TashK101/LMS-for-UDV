using external_training.Tests.UI.SeleniumCore.Controls;
using OpenQA.Selenium;

namespace external_training.Tests.UI.PageObjects.PageElements;

public class LightboxBase : ControlBase
{
    public LightboxBase(ISearchContext searchContext, By selector) : base(searchContext, selector)
    {
        
    }
}
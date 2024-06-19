using external_training.Tests.UI.SeleniumCore.Controls;
using external_training.Tests.UI.SeleniumCore.Controls;
using OpenQA.Selenium;


namespace external_training.Tests.UI.PageObjects.PageElements;

public class TableRow : ControlBase
{
    public TableRow(ISearchContext searchContext, By selector) : base(searchContext, selector)
    {
    }
}
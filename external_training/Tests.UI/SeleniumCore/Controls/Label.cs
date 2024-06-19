using OpenQA.Selenium;

namespace external_training.Tests.UI.SeleniumCore.Controls;

public class Label : ControlBase
{
	public Label(ISearchContext searchContext, By selector) : base(searchContext, selector)
	{
	}

	public string Text => _thisElement.Text;
}
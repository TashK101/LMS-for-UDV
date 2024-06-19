using external_training.Tests.UI.SeleniumCore.Page;
using Kontur.BigLibrary.Tests.UI.PageObjects.PageElements;
using Kontur.BigLibrary.Tests.UI.SeleniumCore.Controls;
using Kontur.BigLibrary.Tests.UI.SeleniumCore.Page;
using OpenQA.Selenium;

namespace external_training.Tests.UI.PageObjects.Pages.MainPage;

public class BookPage : PageBase
{
    private readonly string bookTitle;
    
    public BookPage(IWebDriver driver, string bookTitle) : base(driver)
    {
        this.bookTitle = bookTitle;
    }
    public override string Title => bookTitle;
    
    public override string Url => $"books/{bookTitle}";

    public Label BookName => Find<Label>(By.CssSelector("[data-tid='Name']"));

    public Label BookAuthor => Find<Label>(By.CssSelector("[data-tid='Author']"));
    
    public Label BookDescription => Find<Label>(By.CssSelector("[data-tid='Description']"));

    public Button BorrowButton => Find<Button>(By.CssSelector("[data-tid='take-book']"));
    
    public Button ReturnButton => Find<Button>(By.CssSelector("[data-tid='return-book']"));
    
    public Label BookStatus => Find<Label>(By.CssSelector("[data-tid^='StateLabel']"));
}
using FluentAssertions;
using FluentAssertions.Execution;
using external_training.Tests.UI.Helpers;
using external_training.Tests.UI.PageObjects.Pages;
using external_training.Tests.UI.PageObjects.Pages.MainPage;
using external_training.Tests.UI.SeleniumCore;
using NUnit.Framework;
using external_training.Tests.UI.Helpers;
using OpenQA.Selenium;

namespace external_training.Tests.UI.SeleniumTests;

public class BookListTests : UiTestBase
{
    private string freeLabel = "СВОБОДНА";
    private string borrowedLabel = "ЗАНЯТА";
    
    [Test]
    public async Task Filter_ByOnlyFreeButton_Test()
    {
        var freeBook = BookServiceHelper.CreateBook("FreeBook", "FreeBookAuthor");
        var busyBook = BookServiceHelper.CreateBook("BusyBook", "BusyBookAuthor");
        BookServiceHelper.SetBookAsBusy(busyBook.Id!.Value);
        
        var mainPage = await OpenBookListPage();

        mainPage.FreeOnlyToggle.Click();

        var filteredBooks = mainPage.Books.BookItems.ToList();
        var freeBooks = filteredBooks
            .Where(b => b is not null && b.BookStatus.Text == freeLabel).ToList();

        filteredBooks.Should().BeEquivalentTo(freeBooks);
    }
    
    [Test]
    public async Task SwitchingViewMode_Test()
    {
        var book = BookServiceHelper.CreateBook("SomeBook", "SomeBookAuthor");
        
        var mainPage = await OpenBookListPage();
        var booksCount = mainPage.Books.BookItems.Count;
        
        mainPage.SwitchViewButton.Click();

        var tableRows = mainPage.BookTable.TableRows;

        tableRows.Count.Should().Be(booksCount);
    }

    [Test]
    public async Task CheckBookInformation_Test()
    {
        var book = BookServiceHelper.CreateBook("InterestingBook", "Author");
        
        var bookPage = await OpenBookPage(book.Name);

        using (new AssertionScope())
        {
            bookPage.BookName.Text.Should().Be(book.Name);
            bookPage.BookAuthor.Text.Should().Be(book.Author);
            bookPage.BookDescription.Text.Should().Be(book.Description);
            bookPage.BookStatus.Text.Should().Be(freeLabel);
        }
    }

    [Test]
    public async Task Check_ChangingBookStatus_Test()
    {
        var book = BookServiceHelper.CreateBook("PopularBook", "PopularAuthor");

        var bookPage = await OpenBookPage(book.Name);

        var initialState = bookPage.BookStatus.Text;

        bookPage.BorrowButton.Click();
        
        bookPage.BookStatus.WaitText(borrowedLabel);

        var borrowedState = bookPage.BookStatus.Text;
        
        bookPage.ReturnButton.Click();
        
        bookPage.BookStatus.WaitText(freeLabel);

        var freedState = bookPage.BookStatus.Text;

        using (new AssertionScope())
        {
            initialState.Should().Be(freeLabel);
            borrowedState.Should().Be(borrowedLabel);
            freedState.Should().Be(freeLabel);
        }
    }
}
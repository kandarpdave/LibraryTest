import { Library } from "./abstract/Library";
import { Book } from "./Book";
import { User } from "./User";

/**
 * WindmillLibrary is a concrete implementation of the abstract Library class.
 * It manages books and users, and provides functionality to add/remove books,
 * search books, checkout and return books, and register users.
 */
export class WindmillLibrary extends Library {

  // Library name
  public name: string = 'Windmill Library';

  // Library address
  public address: string = '7060 W Windmill Ln, Las Vegas, NV 89113';
  
  // Collection of books in the library
  protected books: Book[] = [];

  // Collection of registered users
  protected users: User[] = [];

  /**
   * Adds a book to the library collection.
   * @param book - The book to add
   * @returns The added book
   */
  public addBook(book: Book): Book {
    this.books.push(book);

    return book;
  }

  /**
   * Removes a book from the library collection.
   * @param bookToRemove - The book to remove
   * @returns true if removed successfully, false if not found
   */
  public removeBook(bookToRemove: Book): void {
    const index = this.books.findIndex((book: Book) => book.bookId === bookToRemove.bookId);

    if ( index === -1 ) {
      throw new Error('Book not found in library.');
    }

    this.books.splice(index, 1);
  }

  /**
   * Returns the list of all books in the library.
   */
  public getBooks(): Book[] {
    return this.books;
  }

  /**
   * Prints all books in the library to the console.
   */
  public logBookList(): void {
    this.books.forEach((book: Book) => {
      console.log(`${book.bookId}: ${book.name} by ${book.author}`);
    });
  }

  /**
   * Searches for books by name or author.
   * @param query - The search term
   * @returns Array of books matching the query
   */
  searchBooks(query: string): Book[] {
    const booksResult: Book[] = [];

    query = query.toLowerCase();

    this.books.forEach((book: Book) => {
      if (
        book.name.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query)
      ) {
        booksResult.push(book);
      }
    });

    return booksResult;
  }

  /**
   * Retrieves a specific book by its ID.
   * Throws an error if the book does not exist.
   */
  getBook(book: Book): Book {
    const libraryBook = this.books.find((bookItem: Book) => bookItem.bookId === book.bookId);

    if ( !libraryBook ) {
      throw new Error("Such a book does not exist in this library.");
    }

    return libraryBook;
  }

  /**
   * Checks out a book to a user.
   * Throws an error if the book is already checked out.
   */
  checkoutBook(book: Book, user: User): void {
    // See if this library has this book user is trying to check out.
    const libraryBook = this.getBook(book);

    if ( libraryBook.checkedOutByUser ) {
      throw new Error("The book has been checked out by someone.");
    }

    libraryBook.checkedOutByUser = user;
  }

  /**
   * Returns a book to the library.
   * Throws an error if the book is not currently checked out.
   */
  returnBook(book: Book): void {
    const libraryBook = this.getBook(book);

    if ( !libraryBook.checkedOutByUser ) {
      throw new Error("A book not checked-out cannot be returned.");
    }

    libraryBook.checkedOutByUser = null;
  }
  
  /**
   * Registers a new user in the library.
   * @param user - The user to register
   * @returns The registered user
   */
  public registerUser(user: User): User {
    this.users.push(user);
    return user;
  }

}
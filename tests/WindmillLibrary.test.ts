import { WindmillLibrary } from '../src/models/WindmillLibrary';
import { Book } from '../src/models/Book';
import { User } from '../src/models/User';

describe('WindmillLibrary basic functionality', () => {
  let library: WindmillLibrary;
  let user: User;
  let book: Book;

  beforeEach(() => {
    library = new WindmillLibrary();
    user = { userId: 1, name: 'Alice', email: 'alice@example.com' };
    book = { bookId: 1, name: 'Hobbit', author: 'Tolkien', checkedOutByUser: null };
    library.registerUser(user);
    library.addBook(book);
  });

  test('addBook adds a book', () => {
    expect(library.getBooks()).toContain(book);
  });

  test('removeBook removes a book', () => {
    const result = library.removeBook(book);
    expect(library.getBooks()).not.toContain(book);
  });

  test('removeBook throws error if book not found', () => {
    const fakeBook: Book = { bookId: 999, name: 'Fake', author: 'Noone', checkedOutByUser: null };
      expect(() => library.removeBook(fakeBook)).toThrow('Book not found in library.');
  });

  test('searchBooks finds by name', () => {
    const results = library.searchBooks('hobbit');
    expect(results).toContain(book);
  });

  test('searchBooks finds by author', () => {
    const results = library.searchBooks('tolkien');
    expect(results).toContain(book);
  });

  test('checkoutBook sets checkedOutByUser', () => {
    library.checkoutBook(book, user);
    expect(book.checkedOutByUser).toBe(user);
  });

  test('checkoutBook throws if already checked out', () => {
    library.checkoutBook(book, user);
    const anotherUser: User = { userId: 2, name: 'Bob', email: 'bob@example.com' };
    library.registerUser(anotherUser);
    expect(() => library.checkoutBook(book, anotherUser)).toThrow('The book has been checked out by someone.');
  });

  test('returnBook clears checkedOutByUser', () => {
    library.checkoutBook(book, user);
    library.returnBook(book);
    expect(book.checkedOutByUser).toBeNull();
  });

  test('returnBook throws if book not checked out', () => {
    expect(() => library.returnBook(book)).toThrow('A book not checked-out cannot be returned.');
  });
});
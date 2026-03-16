import { Book } from "../Book";
import { User } from "../User";

export abstract class Library {
  public abstract name: string;
  public abstract address: string;

  protected abstract books: Book[];
  protected abstract users: User[];

  public abstract addBook(book: Book): Book;
  public abstract removeBook(bookToRemove: Book): void;

  public abstract getBook(book: Book): Book;
  public abstract getBooks(): Book[];
  public abstract logBookList(): void;
  public abstract searchBooks(query: string): Book[];

  public abstract checkoutBook(book: Book, user: User): void;
  public abstract returnBook(book: Book): void;

  public abstract registerUser(user: User): User;
}
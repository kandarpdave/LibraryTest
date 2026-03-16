import { User } from "./User";

export interface Book {
  bookId: number;
  name: string;
  author: string;

  checkedOutByUser: User | null;
}
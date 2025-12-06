import type { BookGenre } from "../Types/BooksTypes";

export interface Book {
  title: string;
  price: number;
  genre: BookGenre[];
  available: boolean;
}

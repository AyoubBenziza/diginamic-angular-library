import { Injectable } from '@angular/core';
import { Book } from '../interfaces/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  books: Book[] = [
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      category: 'Fiction',
      publishedAt: new Date('1925-04-10'),
    },
    {
      id: 2,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      category: 'Fiction',
      cover: 'https://via.placeholder.com/150',
      publishedAt: new Date('1960-07-11'),
    },
  ];

  constructor() {}

  getBooks(): Book[] {
    return this.books;
  }

  getBookById(id: number | null): Book | null {
    return this.books.find((book) => book.id === id) || null;
  }

  getBookByName(title: string): Book | null {
    return this.books.find((book) => book.title === title) || null;
  }

  createBook(book: Book): void {
    this.books.push(book);
  }

  updateBook(id: number, book: Book): void {
    this.books = this.books.map((b) => (b.id === id ? book : b));
  }

  deleteBook(id: number): void {
    this.books = this.books.filter((book) => book.id !== id);
  }
}

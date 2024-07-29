import { Injectable } from '@angular/core';
import { Book } from '../interfaces/book.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private booksSubject: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>(
    []
  );
  books$: Observable<Book[]> = this.booksSubject.asObservable();

  constructor() {
    this.booksSubject.next([
      {
        id: Date.now() + 1,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        category: 'Fiction',
        publishedAt: new Date('1925-04-10'),
      },
      {
        id: Date.now() + 2,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        category: 'Fiction',
        cover: 'https://via.placeholder.com/150',
        publishedAt: new Date('1960-07-11'),
      },
    ]);
  }

  getBooks(): Observable<Book[]> {
    return this.books$;
  }

  getBookById(id: number | null): Book | undefined {
    return this.booksSubject.getValue().find((book) => book.id === id);
  }

  createBook(book: Book): void {
    const books = this.booksSubject.getValue();
    books.push(book);
    this.booksSubject.next(books);
  }

  updateBook(id: number, updatedBook: Book): void {
    const books = this.booksSubject.getValue();
    const index = books.findIndex((book) => book.id === id);
    if (index !== -1) {
      books[index] = updatedBook;
      this.booksSubject.next(books);
    }
  }

  deleteBook(id: number): void {
    const books = this.booksSubject.getValue();
    const updatedBooks = books.filter((book) => book.id !== id);
    this.booksSubject.next(updatedBooks);
  }
}

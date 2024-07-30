import {Injectable} from '@angular/core';
import {Book} from '../interfaces/book.model';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private booksSubject = new BehaviorSubject<Book[]>([])
  private apiUrl = 'http://localhost:3000/books';

  constructor(private http: HttpClient) {
    this.loadBooks();
  }

  private loadBooks(): void {
    this.http.get<Book[]>(this.apiUrl).subscribe(books => {
      this.booksSubject.next(books);
    });
  }

  getBooks(): Observable<Book[]> {
    return this.booksSubject.asObservable();
  }

  getBookById(id: number | null): Observable<Book> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Book>(url);
  }

  createBook(book: Book): void {
    this.http.post<Book>(this.apiUrl, {...book,"id":book.id.toString()}).pipe(
      tap(() => this.loadBooks())
    ).subscribe();
  }

  updateBook(id: number, updatedBook: Book): void {
    const url = `${this.apiUrl}/${id}`;
    this.http.put<void>(url, updatedBook).pipe(
      tap(() => this.loadBooks())
    ).subscribe();
  }

  deleteBook(id: number): void {
    const url = `${this.apiUrl}/${id}`;
    this.http.delete<void>(url).pipe(
      tap(() => this.loadBooks())
    ).subscribe();
  }
}

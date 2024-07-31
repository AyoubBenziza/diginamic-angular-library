import { AsyncPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BookFormComponent } from '../book-form/book-form.component';
import { Book } from '../interfaces/book.model';
import { BookService } from '../services/book.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [BookFormComponent, DatePipe, AsyncPipe],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
})
export class BookListComponent {
  books: Observable<Book[]>;
  selectedBookId: number | null = null;
  isFormActive = false;
  isAscending = true;

  constructor(private bookService: BookService, private router: Router) {
    this.books = this.bookService.getBooks();
  }

  viewBookDetails(bookId: number): void {
    this.router.navigate(['/books', bookId, 'view']);
  }

  editBook(id: number): void {
    this.selectedBookId = id;
    this.activateForm();
  }

  removeBook(id: number): void {
    this.bookService.deleteBook(id);
  }

  sortBooksByTitle(): void {
    this.isAscending = !this.isAscending;
    this.books.subscribe((books) => {
      this.books = new Observable((observer) => {
        observer.next(
          books.sort((a, b) => {
            const comparison = a.title.localeCompare(b.title);
            return this.isAscending ? comparison : -comparison;
          })
        );
      });
    });
  }

  activateForm(): void {
    this.isFormActive = true;
  }

  deactivateForm(): void {
    this.isFormActive = false;
    this.selectedBookId = null;
  }

  onFormSubmitted(): void {
    this.deactivateForm();
  }
}

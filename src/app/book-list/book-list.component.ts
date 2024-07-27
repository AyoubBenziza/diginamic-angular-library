import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { BookFormComponent } from '../book-form/book-form.component';
import { Book } from '../interfaces/book.model';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [BookFormComponent, DatePipe],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
})
export class BookListComponent {
  books: Book[] = [];
  isFormActive = false;
  isAscending = true;

  constructor(private bookService: BookService) {
    this.books = this.bookService.getBooks();
  }

  ngOnInit() {
    this.books = this.bookService.getBooks();
  }

  removeBook(id: number): void {
    this.bookService.deleteBook(id);
    this.books = this.bookService.getBooks();
  }

  sortBooksByTitle(): void {
    this.books = this.books.sort((a, b) => {
      if (this.isAscending) {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
    this.isAscending = !this.isAscending; // Toggle sort order
  }

  activateForm(): void {
    this.isFormActive = true;
  }

  deactivateForm(): void {
    this.isFormActive = false;
  }

  onFormSubmitted(): void {
    this.deactivateForm();
  }
}

import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  AbstractControl,
  Validators,
} from '@angular/forms';
import { BookService } from '../services/book.service';
import { Book } from '../interfaces/book.model';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [BookService],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss',
})
export class BookFormComponent {
  bookForm = new FormGroup({
    id: new FormControl(0),
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    cover: new FormControl(''),
    publishedAt: new FormControl<Date>(new Date(), Validators.required),
  });

  constructor(private bookService: BookService) {}

  onSubmit(): void {
    const book: Book = {
      id: this.bookForm.value.id || 0,
      title: this.bookForm.value.title || '',
      author: this.bookForm.value.author || '',
      category: this.bookForm.value.category || '',
      cover: this.bookForm.value.cover || undefined,
      publishedAt: this.bookForm.value.publishedAt || new Date(),
    };
    console.log(book);
    this.bookService.createBook(book);
  }
}

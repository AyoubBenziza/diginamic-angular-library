import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges,} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators,} from '@angular/forms';
import {Book} from '../interfaces/book.model';
import {BookService} from '../services/book.service';
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss',
})
export class BookFormComponent implements OnInit, OnChanges{
  @Input() bookId: number | null = null;
  @Output() formSubmitted = new EventEmitter<void>();
  @Output() formClosed = new EventEmitter<void>();
  isEditMode = false;

  bookForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    cover: new FormControl(''),
    publishedAt: new FormControl<Date>(new Date(), Validators.required),
  });

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    if (this.bookId) {
      this.loadBookData();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['bookId'] && changes['bookId'].currentValue !== null) {
      this.loadBookData();
    } else {
      this.resetForm();
    }
  }

  loadBookData(): void {
    if (this.bookId !== null) {
      firstValueFrom(this.bookService.getBookById(this.bookId)).then(book => {
          this.isEditMode = true;
          this.bookForm.patchValue({
            id: book.id,
            title: book.title,
            author: book.author,
            category: book.category,
            publishedAt: new Date(book.publishedAt).toLocaleDateString('en-CA'),
        }
      )});
    }
  }

  resetForm(): void {
    this.bookId = null;
    this.isEditMode = false;
    this.bookForm.reset();
  }

  submitBookForm(): void {
    if (this.bookForm.valid) {
      const book: Book = {
        id: this.bookId || Date.now(),
        title: this.bookForm.value.title || '',
        author: this.bookForm.value.author || '',
        category: this.bookForm.value.category || '',
        cover: this.bookForm.value.cover || undefined,
        publishedAt: this.bookForm.value.publishedAt || new Date(),
      };
      console.log(book);
      if (this.isEditMode) {
        this.bookService.updateBook(book.id, book);
      } else {
        this.bookService.createBook(book);
      }
      this.formSubmitted.emit();
      this.resetForm();
      this.bookId = null;
    }
  }

  closeBookForm(): void {
    this.resetForm();
    this.formClosed.emit();
  }
}

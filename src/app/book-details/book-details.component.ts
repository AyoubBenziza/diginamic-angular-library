import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BookService} from "../services/book.service";
import {Book} from "../interfaces/book.model";
import {AsyncPipe, DatePipe} from "@angular/common";

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [AsyncPipe, DatePipe],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent implements OnInit {
  book: Book | null = null;

  constructor(private bookService: BookService, private route: ActivatedRoute) {
  }

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.bookService.getBookById(parseInt(id)).subscribe(
        book => this.book = book
      )
    }
  }

}

import { Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import {NotFoundComponent} from "./not-found/not-found.component";
import {BookDetailsComponent} from "./book-details/book-details.component";

export const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'books', component: BookListComponent },
  { path: 'books/:id/view', component: BookDetailsComponent },
  { path: '**', component: NotFoundComponent }
];

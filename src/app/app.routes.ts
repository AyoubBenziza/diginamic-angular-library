import { Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'books', component: BookListComponent },
];

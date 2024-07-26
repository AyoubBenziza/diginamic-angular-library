export interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  cover?: string;
  publishedAt: Date;
}

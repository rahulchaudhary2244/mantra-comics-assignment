export type Image = {
  id: number;
  file: string;
  width: number;
  height: number;
  created_at: string;
  updated_at: string;
};

export type Page = {
  id: number;
  page_index: number;
  image: Image;
};

export type Book = {
  id: number;
  title: string;
  chapter_ids: number[];
};

export type DataObject = {
  id: number;
  title: string;
  book: Book;
  chapter_index: number;
  pages: Page[];
};

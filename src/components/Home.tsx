import { BookTitleNavigation } from './BookTitleNavigation';
import { ChapterContent } from './ChapterContent';
import { ChapterNavigation } from './ChapterNavigation';
import { useBooksData } from '@/providers/BooksProvider/useBooksData';

export const Home = () => {
  const { data, isLoading, isFetching, isError } = useBooksData();

  if (isLoading || isFetching) {
    return <div className="mt-4 text-center">Loading books...</div>;
  }

  if (data === undefined || isError)
    return <div className="mt-4 text-center">Oops something went wrong...</div>;

  return (
    <>
      <BookTitleNavigation />
      <ChapterNavigation />
      <ChapterContent />
    </>
  );
};

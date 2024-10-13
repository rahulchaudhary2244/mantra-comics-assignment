import { useBooksData } from '@/providers/BooksProvider/useBooksData';
import { Button } from './ui/button';
import { useBooksApi } from '@/providers/BooksProvider/useBooksApi';

export const BookTitleNavigation = () => {
  const { data, activeBookId } = useBooksData();
  const { setBooksData } = useBooksApi();

  if (data === undefined) return null;

  const handleClick = (bookId: number) => {
    setBooksData({
      activeBookId: bookId,
      activeChapterId: data.find((book) => book.id === bookId)?.chapter_ids[0],
    });
  };

  return (
    <div className="flex gap-2 justify-center mt-4 flex-wrap">
      {data.map(({ id, title }) => {
        return (
          <Button
            aria-label={title}
            key={id}
            size="sm"
            variant={activeBookId === id ? undefined : 'outline'}
            onClick={() => handleClick(id)}
          >
            {title}
          </Button>
        );
      })}
    </div>
  );
};

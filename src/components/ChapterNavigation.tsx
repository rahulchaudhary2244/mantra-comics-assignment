import { useBooksApi } from '@/providers/BooksProvider/useBooksApi';
import { Button } from './ui/button';
import { useBooksData } from '@/providers/BooksProvider/useBooksData';

export const ChapterNavigation = () => {
  const { data, activeBookId, activeChapterId } = useBooksData();
  const { setBooksData } = useBooksApi();

  if (data === undefined) return null;

  const activeBook = data.find((book) => book.id === activeBookId);

  const handleClick = (chapterId: number) => {
    setBooksData({ activeChapterId: chapterId });
  };

  return (
    <div className="flex gap-2 justify-center mt-4">
      {activeBook?.chapter_ids.map((chapterId) => {
        return (
          <Button
            aria-label={`Chapter ${chapterId}`}
            key={chapterId}
            size="sm"
            variant={activeChapterId === chapterId ? undefined : 'outline'}
            onClick={() => handleClick(chapterId)}
          >
            {chapterId}
          </Button>
        );
      })}
    </div>
  );
};

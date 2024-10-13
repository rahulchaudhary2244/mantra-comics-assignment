import { fetchData } from '@/lib/utils';
import { useBooksApi } from '@/providers/BooksProvider/useBooksApi';
import { useBooksData } from '@/providers/BooksProvider/useBooksData';
import { BASE_URL } from '@/utils/constants';
import { DataObject } from '@/utils/types';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { ComicImages } from './ComicImages';

export const ChapterContent = () => {
  const {
    activeBookId,
    activeChapterId,
    data: booksData,
    isLastBookId,
    isLastChapterId,
    isFirstBookId,
    isFirstChapterId,
  } = useBooksData();
  const { setBooksData } = useBooksApi();
  const [activePageIdx, setActivePageIdx] = useState(0);

  const url = `${BASE_URL}/chapters/${activeChapterId}/`;

  const { data, isFetching } = useQuery<DataObject>({
    queryKey: ['chapters', activeChapterId, activeBookId],
    queryFn: () => fetchData(url),
    staleTime: Infinity,
  });

  if (booksData === undefined) return null;

  if (isFetching) {
    return <div className="mt-4 text-center">Loading the chapter...</div>;
  }

  if (data === undefined)
    return <h1 className="mt-4 text-center">Oops something went wrong...</h1>;

  const activePage = data.pages[activePageIdx];
  const currentPage = activePageIdx + 1;
  const totalPages = data.pages.length;

  const handleNext = () => {
    const isLastPageOfChapter = currentPage >= totalPages;
    const isLastPageOfBook = isLastChapterId && isLastPageOfChapter;
    const isEndOfLibrary = isLastBookId && isLastPageOfBook;

    const getNextChapterIndex = () => {
      const activeBook = booksData.find((book) => book.id === activeBookId);
      return (
        (activeBook?.chapter_ids.findIndex(
          (chapterId) => chapterId === activeChapterId
        ) ?? 0) + 1
      );
    };

    const goToNextBook = () => {
      const nextBookIndex =
        booksData.findIndex((book) => book.id === activeBookId) + 1;
      setBooksData({
        activeBookId: booksData[nextBookIndex].id,
        activeChapterId: booksData[nextBookIndex].chapter_ids[0],
      });
      setActivePageIdx(0);
    };

    const resetToFirstBook = () => {
      setActivePageIdx(0);
      setBooksData({
        activeBookId: booksData[0].id,
        activeChapterId: booksData[0].chapter_ids[0],
      });
    };

    if (!isLastPageOfChapter) {
      // User is not at the last page of the chapter
      setActivePageIdx(activePageIdx + 1);
      return;
    }

    if (isEndOfLibrary) {
      // User is at the last page of the last chapter of the last book
      resetToFirstBook();
      return;
    }

    if (isLastPageOfBook) {
      // User is at the last page of the last chapter of the current book
      goToNextBook();
      return;
    }

    // User has reached the last page of the current chapter, but more chapters exist
    const nextChapterIndex = getNextChapterIndex();
    setBooksData({
      activeChapterId: booksData.find((book) => book.id === activeBookId)
        ?.chapter_ids[nextChapterIndex],
    });
    setActivePageIdx(0);
  };

  const handlePrevious = () => {
    const isFirstPageOfChapter = currentPage <= 1;
    const isFirstPageOfBook = isFirstChapterId && isFirstPageOfChapter;
    const isStartOfLibrary = isFirstBookId && isFirstPageOfBook;

    const getPreviousChapterIndex = () => {
      const activeBook = booksData.find((book) => book.id === activeBookId);
      return (
        (activeBook?.chapter_ids.findIndex(
          (chapterId) => chapterId === activeChapterId
        ) ?? 0) - 1
      );
    };

    const goToPreviousBook = () => {
      const previousBookIndex =
        booksData.findIndex((book) => book.id === activeBookId) - 1;
      const previousBook = booksData[previousBookIndex];
      const lastChapterId =
        previousBook.chapter_ids[previousBook.chapter_ids.length - 1];
      setBooksData({
        activeBookId: previousBook.id,
        activeChapterId: lastChapterId,
      });
      setActivePageIdx(0);
    };

    const resetToLastBook = () => {
      const lastBookIndex = booksData.length - 1;
      const lastBook = booksData[lastBookIndex];
      const lastChapterId =
        lastBook.chapter_ids[lastBook.chapter_ids.length - 1];
      setActivePageIdx(0);
      setBooksData({
        activeBookId: lastBook.id,
        activeChapterId: lastChapterId,
      });
    };

    if (!isFirstPageOfChapter) {
      // User is not at the first page of the chapter
      setActivePageIdx(activePageIdx - 1);
      return;
    }

    if (isStartOfLibrary) {
      // User is at the first page of the first chapter of the first book
      resetToLastBook();
      return;
    }

    if (isFirstPageOfBook) {
      // User is at the first page of the first chapter of the current book
      goToPreviousBook();
      return;
    }

    // User is at the first page of the current chapter but can go to the previous chapter
    const previousChapterIndex = getPreviousChapterIndex();
    const previousChapterId = booksData.find((book) => book.id === activeBookId)
      ?.chapter_ids[previousChapterIndex];

    if (previousChapterId) {
      setBooksData({
        activeChapterId: previousChapterId,
      });
      setActivePageIdx(0);
    }
  };

  return (
    <div className="px-7">
      <ComicImages
        className="mt-4 mx-auto w-full"
        activeImage={activePage.image}
        isFetching={isFetching}
        pages={data.pages}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
      />
      <div className="text-3xl text-gray-500 font-medium text-center mt-4 h-36">
        {currentPage}&nbsp;/&nbsp;{totalPages}
      </div>
    </div>
  );
};

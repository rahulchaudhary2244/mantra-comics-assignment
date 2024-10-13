import { fetchData } from '@/lib/utils';
import { useBooksApi } from '@/providers/BooksProvider/useBooksApi';
import { useBooksData } from '@/providers/BooksProvider/useBooksData';
import { BASE_URL } from '@/utils/constants';
import { DataObject } from '@/utils/types';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { ComicImages } from './ComicImages';

const getUrl = (chapterId: number) => `${BASE_URL}/chapters/${chapterId}/`;

export const ChapterContent = () => {
  const {
    activeBookId,
    activeChapterId,
    data: booksData,
    isLastBookId,
    isLastChapterId,
    isFirstBookId,
    isFirstChapterId,
    activePageIdx,
  } = useBooksData();
  const { setBooksData } = useBooksApi();
  const [isPreviousClicked, setPreviousClicked] = useState(false);
  const queryClient = new QueryClient();

  const { data, isFetching, isError, isLoading } = useQuery<DataObject>({
    queryKey: ['chapters', activeChapterId, activeBookId],
    queryFn: () => fetchData(getUrl(activeChapterId)),
    staleTime: Infinity,
  });

  if (booksData === undefined) return null;

  if (isFetching || isLoading) {
    return <div className="mt-4 text-center">Loading the chapter...</div>;
  }

  if (data === undefined || isError)
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
        activePageIdx: 0,
      });
    };

    const resetToFirstBook = () => {
      setBooksData({
        activeBookId: booksData[0].id,
        activeChapterId: booksData[0].chapter_ids[0],
        activePageIdx: 0,
      });
    };

    if (!isLastPageOfChapter) {
      // User is not at the last page of the chapter
      setBooksData({ activePageIdx: activePageIdx + 1 });
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
      activePageIdx: 0,
    });
  };

  const handlePrevious = async () => {
    const isFirstPageOfChapter = currentPage <= 1;
    const isFirstPageOfBook = isFirstChapterId && isFirstPageOfChapter;
    const isStartOfLibrary = isFirstBookId && isFirstPageOfBook;

    const fetchLastPageIndexIfNotCached = async ({
      chapterId,
      bookId,
    }: {
      chapterId: number;
      bookId: number;
    }) => {
      const { pages } = await queryClient.ensureQueryData<DataObject>({
        queryKey: ['chapters', chapterId, bookId],
        queryFn: () => fetchData(getUrl(chapterId)),
        staleTime: Infinity,
      });
      return pages.length - 1;
    };

    const getPreviousChapterIndex = () => {
      const activeBook = booksData.find((book) => book.id === activeBookId);
      return (
        (activeBook?.chapter_ids.findIndex(
          (chapterId) => chapterId === activeChapterId
        ) ?? 0) - 1
      );
    };

    const goToPreviousBook = async () => {
      const previousBookIndex =
        booksData.findIndex((book) => book.id === activeBookId) - 1;
      const previousBook = booksData[previousBookIndex];
      const lastChapterId =
        previousBook.chapter_ids[previousBook.chapter_ids.length - 1];
      setBooksData({
        activeBookId: previousBook.id,
        activeChapterId: lastChapterId,
        activePageIdx: await fetchLastPageIndexIfNotCached({
          bookId: previousBook.id,
          chapterId: lastChapterId,
        }),
      });
    };

    const resetToLastBook = async () => {
      const lastBookIndex = booksData.length - 1;
      const lastBook = booksData[lastBookIndex];
      const lastChapterId =
        lastBook.chapter_ids[lastBook.chapter_ids.length - 1];
      setBooksData({
        activeBookId: lastBook.id,
        activeChapterId: lastChapterId,
        activePageIdx: await fetchLastPageIndexIfNotCached({
          bookId: lastBook.id,
          chapterId: lastChapterId,
        }),
      });
    };

    if (!isFirstPageOfChapter) {
      // User is not at the first page of the chapter
      setBooksData({ activePageIdx: activePageIdx - 1 });
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
        activePageIdx: await fetchLastPageIndexIfNotCached({
          bookId: activeBookId,
          chapterId: previousChapterId,
        }),
      });
    }
  };

  return (
    <div className="px-7">
      <ComicImages
        className="mt-4 mx-auto w-full"
        activeImage={activePage.image}
        disableButtons={isFetching || isLoading || isPreviousClicked}
        pages={data.pages}
        handleNext={handleNext}
        handlePrevious={async () => {
          setPreviousClicked(true);
          await handlePrevious();
          setPreviousClicked(false);
        }}
      />
      <div className="text-3xl text-gray-500 font-medium text-center mt-4 h-36">
        {currentPage}&nbsp;/&nbsp;{totalPages}
      </div>
    </div>
  );
};

import { useContext } from 'react';
import { BooksContextData } from './BooksProvider';
import { useQuery } from '@tanstack/react-query';
import { Book } from '@/utils/types';
import { fetchData } from '@/lib/utils';
import { BASE_URL } from '@/utils/constants';
import { useBooksApi } from './useBooksApi';

export const useBooksData = () => {
  const state = useContext(BooksContextData);
  const { setBooksData } = useBooksApi();

  const queryFn = async () => {
    const data = await fetchData<Book[]>(`${BASE_URL}/books/`);
    setBooksData({
      activeBookId: data[0].id,
      activeChapterId: data[0].chapter_ids[0],
    });
    return data;
  };

  const { data, isLoading, isFetching, isError } = useQuery<Book[]>({
    queryKey: ['books'],
    queryFn,
    staleTime: Infinity,
  });

  if (!state) {
    throw new Error('useBooks must be used within an BooksProvider');
  }

  const { activeBookId, activeChapterId } = state;

  const dataLength = data?.length ?? 0;

  const isLastBookId =
    data?.findIndex((book) => book.id === activeBookId) === dataLength - 1;

  const isFirstBookId =
    data?.findIndex((book) => book.id === activeBookId) === 0;

  const activeChapters =
    data?.find((book) => book.id === activeBookId)?.chapter_ids ?? [];

  const isLastChapterId =
    activeChapters?.findIndex((chapterId) => chapterId === activeChapterId) ===
    activeChapters.length - 1;

  const isFirstChapterId =
    activeChapters?.findIndex((chapterId) => chapterId === activeChapterId) ===
    0;

  return {
    ...state,
    data,
    isLoading,
    isFetching,
    isError,
    isLastBookId,
    isLastChapterId,
    isFirstBookId,
    isFirstChapterId,
  };
};

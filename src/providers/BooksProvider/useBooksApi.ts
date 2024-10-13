import { useContext } from 'react';
import { BooksContextApi } from './BooksProvider';
import { State } from './BooksProvider';

export const useBooksApi = () => {
  const dispatch = useContext(BooksContextApi);

  if (!dispatch) {
    throw new Error('useBooksApi must be used within an BooksProvider');
  }

  const setBooksData = (payload: Partial<State>) => {
    dispatch({ payload });
  };

  return { setBooksData };
};

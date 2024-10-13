import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BooksProvider } from './BooksProvider/BooksProvider';

export const Providers = ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BooksProvider>{children}</BooksProvider>
    </QueryClientProvider>
  );
};

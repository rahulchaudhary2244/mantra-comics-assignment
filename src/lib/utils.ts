import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetchData = async <T>(url: string) => {
  const response = await fetch(url);
  return (await response.json()) as T;
};

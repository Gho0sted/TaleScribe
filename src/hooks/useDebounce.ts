import { useRef } from 'react';

export const useDebounce = <T extends (...args: any[]) => void>(fn: T, delay = 300) => {
  const timeout = useRef<NodeJS.Timeout>();
  return (...args: Parameters<T>) => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => fn(...args), delay);
  };
};

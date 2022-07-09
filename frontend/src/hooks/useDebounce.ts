import { useRef } from 'react';

export const useDebounce = (fn: Function, timeout: number) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  return () => {
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      fn();
    }, timeout);
  };
};

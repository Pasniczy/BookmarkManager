import { useRef, useCallback } from 'react';

export const useDebounce = () => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  return useCallback((fn: Function, timeout: number) => {
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      fn();
    }, timeout);
  }, []);
};

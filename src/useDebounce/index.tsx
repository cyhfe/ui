import { useCallback, useRef } from 'react';

function useDebounce<T extends (...args: any[]) => any>(
  cb: T,
  delay: number,
): T {
  let { current: timer } = useRef<NodeJS.Timeout>(null);
  return useCallback(
    (...args: any) => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        cb(...args);
      }, delay);
    },
    [delay, cb],
  ) as T;
}

export { useDebounce };

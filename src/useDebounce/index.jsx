import React from 'react';
import { useLayoutEffect, useRef } from 'react';

export function debounce(callback, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(args);
    }, delay);
  };
}

export function useDebounce(callback, delay) {
  const callbackRef = useRef(null);

  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  return React.useMemo(() => debounce(callback, delay), [delay]);
}

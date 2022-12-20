import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useLayoutEffect } from 'react';

export function useInterval(callback, delay) {
  const callbackRef = useRef(null);

  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    let timer = setInterval(() => {
      callbackRef.current();
    }, delay);

    return () => {
      clearInterval(timer);
    };
  }, [delay]);
}

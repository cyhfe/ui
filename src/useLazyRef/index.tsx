import React from 'react';

function useLazyRef<T>(fn: () => T) {
  const lazyRef = React.useRef<T | null>(null);
  if (lazyRef.current === null) {
    const newInstance = fn();
    lazyRef.current = newInstance;
  }
  return lazyRef.current;
}

export default useLazyRef;

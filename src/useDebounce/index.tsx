import * as React from 'react';

function useThrottle(cb: (...arg: any[]) => void, gap: number) {
  const shouldWaitRef = React.useRef(false);
  const callbackRef = React.useRef(cb);

  React.useLayoutEffect(() => {
    callbackRef.current = cb;
  });

  return React.useCallback(
    (...args: any[]) => {
      if (shouldWaitRef.current) return;
      callbackRef.current(...args);
      shouldWaitRef.current = true;
      setTimeout(() => {
        shouldWaitRef.current = false;
      }, gap);
    },
    [gap],
  );
}

function useDebounce(cb: (...args: any[]) => void, delay: number) {
  const callbackRef = React.useRef(cb);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useLayoutEffect(() => {
    callbackRef.current = cb;
  });

  return React.useCallback(
    function (...args: any[]) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay],
  );
}

export { useDebounce, useThrottle };

// function debounce(cb, delay) {
//   let timer;
//   return function (...args) {
//     if (timer) {
//       clearTimeout(timer);
//     }
//     timer = setTimeout(() => {
//       cb(...args);
//     }, delay);
//   };
// }

// function throttle(cb, gap) {
//   let shouldWait = false;
//   return function (...args) {
//     if (shouldWait) return;
//     cb(...args);
//     shouldWait = true;
//     setTimeout(() => {
//       shouldWait = false;
//     }, gap);
//   };
// }

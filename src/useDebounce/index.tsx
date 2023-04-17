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

// // 间隔一段时间内立即执行一次，取消后续调用
// function throttle(cb: (...args: any[]) => any, delay: number) {
//   let shouldWait = false;
//   return (...args: any) => {
//     if (!shouldWait) {
//       cb(...args);
//       shouldWait = true;
//       setTimeout(() => {
//         shouldWait = false;
//       }, delay);
//     }
//   };
// }

// // 间隔一段时间执行，期间被调用重新计时
// function debounce(cb: (...args: any[]) => any, delay: number) {
//   let shouldWait = false;
//   return (...args: any) => {
//     if (!shouldWait) {
//       cb(...args);
//       shouldWait = true;
//       setTimeout(() => {
//         shouldWait = false;
//       }, delay);
//     }
//   };
// }

import { useCallback, useRef } from 'react';

function useThrottle(cb: (...args: any) => any, delay: number) {
  let { current: shouldWait } = useRef(false);
  return useCallback(
    (...args: any) => {
      if (!shouldWait) {
        cb(...args);
        shouldWait = true;
        setTimeout(() => {
          shouldWait = false;
        }, delay);
      }
    },
    [delay, cb],
  );
}

export { useThrottle };

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

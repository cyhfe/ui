import { useCallback, useRef } from 'react';
function useThrottle(cb, delay) {
  var _useRef = useRef(false),
    shouldWait = _useRef.current;
  return useCallback(function () {
    if (!shouldWait) {
      cb.apply(void 0, arguments);
      shouldWait = true;
      setTimeout(function () {
        shouldWait = false;
      }, delay);
    }
  }, [delay, cb]);
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
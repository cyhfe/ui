import { useCallback, useRef } from 'react';
function useDebounce(cb, delay) {
  var _useRef = useRef(null),
    timer = _useRef.current;
  return useCallback(function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      cb.apply(void 0, args);
    }, delay);
  }, [delay, cb]);
}
export { useDebounce };
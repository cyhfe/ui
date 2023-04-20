import { useEffect } from 'react';
var MOUSEDOWN = 'mousedown';
var TOUCHSTART = 'touchstart';
var events = [MOUSEDOWN, TOUCHSTART];
export function useOnClickOutside(ref, handler, options) {
  useEffect(function () {
    if (!handler) {
      return;
    }
    var listener = function listener(event) {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    events.forEach(function (event) {
      document.addEventListener(event, listener, options);
    });
    return function () {
      events.forEach(function (event) {
        document.removeEventListener(event, listener);
      });
    };
  }, [!handler]);
}
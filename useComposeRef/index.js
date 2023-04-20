import { useCallback } from 'react';
function assignRef(ref, node) {
  if (typeof ref === 'function') {
    ref(node);
  } else {
    ref.current = node;
  }
}
function useComposeRef() {
  for (var _len = arguments.length, refs = new Array(_len), _key = 0; _key < _len; _key++) {
    refs[_key] = arguments[_key];
  }
  return useCallback(function (node) {
    for (var _i = 0, _refs = refs; _i < _refs.length; _i++) {
      var ref = _refs[_i];
      assignRef(ref, node);
    }
  }, refs);
}
export { useComposeRef };
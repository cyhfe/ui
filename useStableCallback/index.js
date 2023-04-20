import React, { useEffect } from 'react';

/**
 * Converts a callback to a ref to avoid triggering re-renders when passed as a
 * prop and exposed as a stable function to avoid executing effects when
 * passed as a dependency.
 */

function useStableCallback(callback) {
  var callbackRef = React.useRef(callback);
  useEffect(function () {
    callbackRef.current = callback;
  });
  return React.useCallback(function () {
    return callbackRef.current && callbackRef.current.apply(callbackRef, arguments);
  }, []);
}
export { useStableCallback };
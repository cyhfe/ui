import React, { useLayoutEffect } from 'react';

/**
 * Converts a callback to a ref to avoid triggering re-renders when passed as a
 * prop and exposed as a stable function to avoid executing effects when
 * passed as a dependency.
 */

function useStableCallback<T extends (...args: any[]) => any>(
  callback: T | null | undefined,
) {
  const callbackRef = React.useRef(callback);

  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useCallback(
    ((...args) => {
      return callbackRef.current && callbackRef.current(...args);
    }) as T,
    [],
  );
}

export { useStableCallback };

import React, { useEffect, useLayoutEffect, useRef } from 'react';

function useEffectOnlyOnUpdate(
  callback: (dependencies: React.DependencyList | undefined) => void,
  dependencies: React.DependencyList | undefined,
) {
  const didMount = useRef(false);
  const callbackRef = useRef<typeof callback | null>(null);

  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    if (didMount.current) {
      callbackRef.current?.(dependencies);
    } else {
      didMount.current = true;
    }
  }, [dependencies]);
}

export default useEffectOnlyOnUpdate;

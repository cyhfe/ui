import React from 'react';

function useStatefulRefValue<V>(
  ref: React.RefObject<V>,
  initialValue: V,
): [V, (refValue: Exclude<V, null>) => void] {
  const [state, setState] = React.useState(initialValue);
  const callbackRef = React.useCallback((refValue: Exclude<V, null>) => {
    (ref as React.MutableRefObject<V>).current = refValue;
    setState(refValue);
  }, []);
  return [state, callbackRef];
}

export { useStatefulRefValue };

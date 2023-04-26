import React from 'react';

function useStatefulRefValue<V>(
  ref: React.RefObject<V>,
  initialValue: V,
): [V, (refValue: V) => void] {
  const [state, setState] = React.useState(initialValue);
  const callbackRef = React.useCallback(
    (refValue: V) => {
      (ref as React.MutableRefObject<V>).current = refValue;
      setState(refValue);
    },
    [ref],
  );
  return [state, callbackRef];
}

export { useStatefulRefValue };

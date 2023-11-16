import React from 'react';

type PossibleRef<T> = React.Ref<T> | undefined;

function useComposeRefs<T>(...refs: PossibleRef<T>[]) {
  return React.useCallback(
    function composedRef(node: T) {
      for (const ref of refs) {
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref !== null && ref !== undefined) {
          (ref as React.MutableRefObject<T>).current = node;
        }
      }
    },
    [refs],
  );
}

export { useComposeRefs };

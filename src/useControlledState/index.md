# useControlledState

```tsx | pure
import React, { useCallback } from 'react';

function useControlledState<T = any>(
  value: T | undefined,
  defaultValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [unControlledState, setUnControlledState] =
    React.useState(defaultValue);
  const wasControlled = value !== undefined;
  const isControlledRef = React.useRef(wasControlled);

  if (isControlledRef.current !== wasControlled) {
    console.warn(
      `Components should not switch from controlled to uncontrolled `,
    );
  }

  const set: React.Dispatch<React.SetStateAction<T>> = useCallback(
    (nextState) => {
      if (!isControlledRef.current) {
        setUnControlledState(nextState);
      }
    },
    [],
  );

  return [isControlledRef.current ? (value as T) : unControlledState, set];
}

export { useControlledState };
```

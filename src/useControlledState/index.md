# useControlledState

根据 value 判断状态是否受控
如果非受控返回自身维护的状态和 setter
如果是受控，返回 value 和空函数 setter，状态和 setter 由外部组件 callback 提供

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

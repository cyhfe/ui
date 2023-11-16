# useComposeRefs

多个 ref 挂载到同一个 dom 上

在 forwardRef 组件中是常见的需求

## 实现

```tsx | pure
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
```

## 示例

<code src="./demo.tsx"></code>

```tsx | pure
import React, { useEffect } from 'react';
import { useComposeRefs } from '.';
export default function Demo() {
  const ref1 = React.useRef<HTMLDivElement | null>(null);
  const ref2 = React.useRef<HTMLDivElement | null>(null);

  const callbackRef = (node: HTMLDivElement) => {
    ref2.current = node;
  };

  useEffect(() => {
    console.log(ref1.current, ref2.current);
  }, []);

  const composeRefs = useComposeRefs(ref1, callbackRef);
  return <div ref={composeRefs}>compose refs</div>;
}
```

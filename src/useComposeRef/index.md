# useComposeRef

DOM 的 ref 属性可以接受一个 callback((node) => void)
我们可以手动挂载 ref

```tsx | pure
import { useCallback } from 'react';

function assignRef(
  ref: React.MutableRefObject<any> | RefCallback,
  node: HTMLElement,
) {
  if (typeof ref === 'function') {
    ref(node);
  } else {
    ref.current = node;
  }
}

function useComposeRef(...refs: React.MutableRefObject<any>[]) {
  return useCallback((node: HTMLElement) => {
    for (let ref of refs) {
      assignRef(ref, node);
    }
  }, refs);
}

type RefCallback = (node: HTMLElement) => void;

export { useComposeRef };
```

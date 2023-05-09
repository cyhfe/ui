# useLazyRef

如果 ref 的初始化需要昂贵的计算或者只需要初始化一次(比如 tonejs 的 合成器 synth)

[https://github.com/facebook/react/issues/14490#issuecomment-454973512](https://github.com/facebook/react/issues/14490#issuecomment-454973512)

```tsx
import React from 'react';

function useLazyRef<T>(fn: () => T) {
  const lazyRef = React.useRef<T | null>(null);
  if (lazyRef.current === null) {
    const newInstance = fn();
    lazyRef.current = newInstance;
  }
  return lazyRef.current;
}

export default useLazyRef;
```

# useStatefulRefValue

## 问题

ref 不会触发重新渲染，而 useEffect 是 DOM 更新之后的副作用。
在 effect 中使用的任何在更新时不会触发重新渲染的东西都不应该进入依赖数组。

```tsx | pure
// ref值变了，effect没有重新执行
export default function App() {
  const ref = React.useRef(0);
  React.useEffect(() => {
    console.log(ref.current);
  }, [ref.current]);
  return (
    <div>
      <button onClick={() => ref.current++}>+</button>
    </div>
  );
}
```

## 将 ref 保存为状态

```tsx | pure
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
```

## 参考文章

[https://epicreact.dev/why-you-shouldnt-put-refs-in-a-dependency-array/](https://epicreact.dev/why-you-shouldnt-put-refs-in-a-dependency-array/)

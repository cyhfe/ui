# composeEventHandlers

## 问题

组件需要绑定多个事件(组件预设,用户定义)

## 实现

```tsx | pure
interface Handler<T extends any[]> {
  (...args: T): void;
}

function composeEventHandlers<T extends any[]>(...handlers: Handler<T>[]) {
  return function composedHandler(...args: T) {
    for (const handler of handlers) {
      handler(...args);
    }
  };
}

export { composeEventHandlers };
```

## 使用

闭包保存函数集合，返回一个函数调用所有 callback

<code src="./demo.tsx"></code>

```tsx | pure
import { composeEventHandlers } from '.';
export default function Demo() {
  function handler1(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    console.log('handler1', e);
  }
  function handler2(a: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    console.log('handler2', a);
  }

  return (
    <button onClick={composeEventHandlers(handler1, handler2)}>click me</button>
  );
}
```

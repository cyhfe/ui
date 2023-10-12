# \_Slot

## 问题

组件需要绑定多个事件(组件预设,用户定义)

## 解决

闭包保存函数集合，返回一个函数调用所有 callback

```tsx | pure
function callAll(...fns: (((args: any) => void) | undefined)[]) {
  return function (...args: any) {
    const _args = [...args];
    fns.forEach((fn) => fn?.(_args));
  };
}

const handler1 = (...args) => console.log(...args);
const handler2 = (...args) => console.log(...args);

const handler = callAll(handler1, handler2);
handler(1, 2, 3);

export { callAll };
```

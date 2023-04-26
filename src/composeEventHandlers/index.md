# callAll

## 问题

封装的组件有我们预设的事件，用户没办法再绑定事件

## 解决

闭包保存函数集合，返回一个函数调用所有函数

```jsx | pure
function callAll(...fns) {
  return function (...args) {
    fns.forEach((fn) => fn?.(...args));
  };
}
```

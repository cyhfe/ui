# useDebounce & useThrottle

## 框架无关

[https://stackblitz.com/edit/js-ru5s3k?file=index.js,index.html,package.json](https://stackblitz.com/edit/js-ru5s3k?file=index.js,index.html,package.json)

```js | pure
// 延迟执行，期间触发重设延迟时间
// 使用场景: 搜索框停止输入发送请求
function debounce(cb, delay) {
  let timer;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}

// 立即执行，一段时间内再触发忽略
// 使用场景：下拉加载
function throttle(cb, gap) {
  let shouldWait = false;
  return function (...args) {
    if (shouldWait) return;
    cb(...args);
    shouldWait = true;
    setTimeout(() => {
      shouldWait = false;
    }, gap);
  };
}
```

## 在 React 中使用

[https://stackblitz.com/edit/react-ts-ptqenm?file=App.tsx](https://stackblitz.com/edit/react-ts-ptqenm?file=App.tsx)

### 问题

```tsx | pure
export default function App() {
  const [value, setValue] = React.useState('');
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  // 每次渲染都会创建新的函数
  // 原本用闭包保存shouldWait或timerID的效果就起不了作用
  const debouncedHandle = throttle(handleChange, 1000);
  return (
    <div>
      <input type="text" onChange={debouncedHandle} />
      <span>{value}</span>
    </div>
  );
}
```

## 思路

返回的函数可能被作为依赖或者 prop

所以我希望返回一个稳定的函数，`delay | gap`作为依赖更新函数

由于 callback 是外部传进来的，用 ref 保存并用 useLayoutEffect 更新，这样就可以不使用它作为依赖并且拿到最新的值

`shouldWaitRef | timerId`ref 保存

```tsx | pure
function useThrottle(cb: (...arg: any[]) => void, gap: number) {
  const shouldWaitRef = React.useRef(false);
  const callbackRef = React.useRef(cb);

  React.useLayoutEffect(() => {
    callbackRef.current = cb;
  });

  return React.useCallback(
    (...args: any[]) => {
      if (shouldWaitRef.current) return;
      callbackRef.current(...args);
      shouldWaitRef.current = true;
      setTimeout(() => {
        shouldWaitRef.current = false;
      }, gap);
    },
    [gap],
  );
}

export { useThrottle };
```

```tsx | pure
function useDebounce(cb: (...args: any[]) => void, delay: number) {
  const callbackRef = React.useRef(cb);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useLayoutEffect(() => {
    callbackRef.current = cb;
  });

  return React.useCallback(
    function (...args: any[]) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay],
  );
}
```

# Toast

## Toast

<code src="./demo.tsx">toast</code>

- 根据不同 type 渲染对应 toast.内容可以是 message 参数或者 React.ReactNode 的 children
- 通知渲染后开始一个 timer,duration 后关闭.期间鼠标悬停可以暂停,保存剩余时间.移开继续计时
- 动画使用 ReactSpring 命令式 Api 与 timer 同步暂停和继续(不确定有没有更好的方案)

```ts
React.useEffect(() => {
  const timer = timerRef.current;
  autoClose && timer.start();
  apiRef.start();
  return () => {
    autoClose && timer.clear();
    apiRef.stop();
  };
}, [apiRef, autoClose]);
```

### 思路

在 RootContext 中维护一个队列 `queue: Toast[]`

Root 渲染 Portal(这种弹出层一般来说渲染在同一上下文,以便 z-index 管理层级)

我们在任意组件`useToast`都能(从 context)拿到`setQueue`,通过 `queue map `渲染弹窗

还需要维护一个 Timer,具备开始,暂停,继续的功能.

## 用法

```ts | pure
import { css } from '@emotion/react';
import React from 'react';
import { ToastRoot, useToast, type Position } from './index';
function Node() {
  return <div>node</div>;
}

function Example() {
  const { enqueueToast } = useToast('Example');
  return (
    <div
      className="Example"
      css={css`
        display: flex;
        gap: 12px;
      `}
    >
      <button
        type="button"
        onClick={() =>
          enqueueToast({
            type: 'info',
            message: 'info message',
          })
        }
      >
        Add info toast
      </button>
      <button
        type="button"
        onClick={() =>
          enqueueToast({
            type: 'error',
            message: 'error message',
          })
        }
      >
        Add error toast
      </button>
      <button
        type="button"
        onClick={() =>
          enqueueToast({
            type: 'success',
            message: 'success message',
          })
        }
      >
        Add success toast
      </button>
      <button
        type="button"
        onClick={() =>
          enqueueToast({
            type: 'info',
            node: <Node />,
          })
        }
      >
        Add info toast
      </button>
    </div>
  );
}

function App() {
  const [autoClose, setAutoClose] = React.useState(true);
  const [max, setMax] = React.useState<string | undefined>(undefined);
  const [duration, setDuration] = React.useState(3000);
  const [position, setPosition] = React.useState<Position>('top-right');

  return (
    <ToastRoot
      position={position}
      autoClose={autoClose}
      duration={duration}
      max={max === undefined ? max : Number(max)}
    >
      <div
        css={css`
          display: flex;
          gap: 18px;
          margin-bottom: 20px;
        `}
      >
        <div>
          <label htmlFor="autoClose">autoClose: </label>
          <input
            type="checkbox"
            defaultChecked={autoClose}
            value={autoClose ? 1 : 0}
            onChange={(e) => setAutoClose(e.target.checked)}
            id="autoClose"
          />
        </div>
        <div>
          <label htmlFor="duration">duration: </label>
          <input
            type="number"
            defaultValue={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            id="duration"
          />
        </div>
        <div>
          <label htmlFor="position">position: </label>
          <select
            name="position"
            id="position"
            value={position}
            onChange={(e) => setPosition(e.target.value as Position)}
          >
            <option value="top-left">TOP-LEFT</option>
            <option value="top-center">TOP-CENTER</option>
            <option value="top-right">TOP-RIGHT</option>
            <option value="bottom-left">BOTTOM-LEFT</option>
            <option value="bottom-center">BOTTOM-CENTER</option>
            <option value="bottom-right">BOTTOM-RIGHT</option>
          </select>
        </div>
        <div>
          <label htmlFor="max">max: </label>
          <input type="number" onChange={(e) => setMax(e.target.value)} />
        </div>
      </div>
      <Example />
    </ToastRoot>
  );
}

export default App;
```

# useRect

## 在 React 中使用

监控 DOM 位置变化

<code src="./demo.tsx"></code>

```ts | pure
export default function Example() {
  const ref = React.useRef<HTMLDivElement>(null);
  const [observe, setObserve] = React.useState(false);

  const rect = useRect(ref, {
    observe,
    onChange: (arg) => {
      console.log(arg, 'onchange');
    },
  });

  return (
    <div>
      <button type="button" onClick={() => setObserve(!observe)}>
        {observe ? 'Stop' : 'Start'} observing
      </button>
      <pre>{JSON.stringify(rect, null, 2)}</pre>
      <div
        // and then place the ref
        ref={ref}
        contentEditable
        style={{
          display: 'inline-block',
          padding: 10,
          border: 'solid 1px',
        }}
        dangerouslySetInnerHTML={{
          __html: 'Edit this to change the size!',
        }}
      />
    </div>
  );
}
```

## ObserveRect

框架无关，监控 DOM 元素位置变化

[https://stackblitz.com/edit/vitejs-vite-x1hsdo?file=index.html,src%2Fmain.ts,src%2FobserveRect.ts&terminal=dev](https://stackblitz.com/edit/vitejs-vite-x1hsdo?file=index.html,src%2Fmain.ts,src%2FobserveRect.ts&terminal=dev)

## 核心思路

一个全局`Map`集合,保存订阅的 DOM 和对应的`DOMRect`属性。

函数`observeRect`返回订阅和取消订阅两个方法。接受 onChange 参数回调将更改通知到外部。

订阅：

1. 检查 Map，该 DOM 不存在，将 DOM 和 Rect 保存在 Map 中。已存在，将 onChange push 到 callbacks 中
2. 调用`requestAnimationFrame`，遍历 Map 中的 DOM，查询最新的 Rect 并与旧 Rect 对比，如果变更了通过 onChange 通知

取消订阅：
将 DOM 从 Map 集合中移除。如果 Map 为空，停止`requestAnimationFrame`递归

```tsx | pure
const observable = new Map<HTMLElement, RectProps>();
```

```ts | pure
// DOMRect属性不可枚举，Object.keys拿不到
const rectKeys: (keyof DOMRect)[] = [
  'bottom',
  'height',
  'left',
  'right',
  'top',
  'width',
  'x',
  'y',
];

interface RectProps {
  rect: DOMRect;
  callbacks: ((rect: DOMRect) => void)[];
}

let rid: number | null = null;
const observable = new Map<HTMLElement, RectProps>();

function hasChanged(prev: DOMRect, curr: DOMRect) {
  let changed = false;
  rectKeys.forEach((key) => {
    if (prev[key] !== curr[key]) {
      changed = true;
      return;
    }
  });
  return changed;
}

function run(observable: Map<HTMLElement, RectProps>) {
  observable.forEach((prevRectProps, element) => {
    const currRect = element.getBoundingClientRect();
    const changed = hasChanged(prevRectProps.rect, currRect);
    if (changed) {
      const nextRectProps = {
        ...prevRectProps,
        rect: currRect,
      };
      observable.set(element, nextRectProps);
      nextRectProps.callbacks.forEach((cb) => cb(currRect));
    }
  });
  rid = requestAnimationFrame(() => {
    run(observable);
  });
}

function observeRect(dom: HTMLElement, onChange: (rect: DOMRect) => void) {
  function observe() {
    if (!observable.has(dom)) {
      const rect = dom.getBoundingClientRect();
      observable.set(dom, {
        callbacks: [onChange],
        rect,
      });
      onChange(rect);
    } else {
      const currentrectProps = observable.get(dom)!;
      currentrectProps.callbacks.push(onChange);
    }

    if (observable.size > 0 && rid === null) {
      rid = requestAnimationFrame(() => {
        run(observable);
      });
    }
  }
  function unobserve() {
    observable.delete(dom);
    if (observable.size === 0 && rid !== null) {
      cancelAnimationFrame(rid);
      rid = null;
    }
  }
  return {
    observable,
    observe,
    unobserve,
  };
}

export default observeRect;
```

## 自定义 hook：useRect

```ts | pure
import React, { useLayoutEffect } from 'react';
import observeRect from './observeRect';

function useRect(
  ref: React.RefObject<HTMLElement | null>,
  options: {
    observe?: boolean;
    onChange?: (rect: DOMRect) => void;
  } = {},
) {
  const { observe = true, onChange = () => {} } = options;
  const [rect, setRect] = React.useState<DOMRect | null>(null);
  const [element, setElement] = React.useState<HTMLElement | null>(ref.current);

  const savedOnchange = React.useRef(onChange);
  const savedElement = React.useRef(ref.current);
  const initialRectSet = React.useRef(false);

  // 更新 onChange, savedElement
  useLayoutEffect(() => {
    savedElement.current = ref.current;
    savedOnchange.current = onChange;
  });

  // 更新 element

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    if (element !== savedElement.current) {
      // console.log('更新 element', element, savedElement.current);
      setElement(savedElement.current);
    }
  });

  // 初次渲染更新rect
  useLayoutEffect(() => {
    if (!initialRectSet.current) {
      if (!element) {
        return;
      }

      // console.log(element, element.getBoundingClientRect(), '初次渲染更新rect');

      const nextRect = element.getBoundingClientRect();
      setRect(nextRect);
      savedOnchange.current(nextRect);
      initialRectSet.current = true;
    }
  }, [element]);

  // 订阅及取消订阅
  useLayoutEffect(() => {
    if (!observe || !element) return;
    const observor = observeRect(element, (rect) => {
      savedOnchange.current(rect);
      setRect(rect);
    });
    observor.observe();
    return () => {
      observor.unobserve();
    };
  }, [element, observe]);

  return rect;
}

export default useRect;
```

## 性能考虑

一般情况下，我们直接通过`el.getBoundingRect`获取元素位置信息就好，随用随取。

我在写`Tooltip`的时候，popup 的元素使用`portal`渲染在外部，trigger 元素在组件内部。

如何让 popup 定位到指定位置，我需要 trigger 和 popup 的元素位置信息去计算。

trigger 随时会变化，有些可以通过`onScroll, onResize`来重新计算，但是有 DOM 内容等其他无法捕获的改变。

`useRect`接受`observe`选项来控制订阅。所以可以只在`tooltip`组件`visible`的时候订阅。

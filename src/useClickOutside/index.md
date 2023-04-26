# useClickOutside

window 上监听`mousedown`事件, 通过`ref.current.contains(event.target as Node)`判断是否点击在目标元素外。

对于单层元素，这个还是普遍适用的。

我写 Dialog 时，碰到多层嵌套的对话框逐级关闭，这个方法会把全部 dialog 都关掉。

解决方法其实也很简单：

1. `content`和`overlay`都阻止 click 冒泡
2. 点击`overlay`关闭`content`, 如果点击`content`停止冒泡，就不会触发`overlay`的关闭事件

```tsx | pure
import { useEffect } from 'react';

const MOUSEDOWN = 'mousedown';
const TOUCHSTART = 'touchstart';

type HandledEvents = [typeof MOUSEDOWN, typeof TOUCHSTART];

type PossibleEvent = MouseEvent | TouchEvent;
type Handler = (event: PossibleEvent) => void;

const events: HandledEvents = [MOUSEDOWN, TOUCHSTART];

export function useOnClickOutside(
  ref: React.RefObject<HTMLElement>,
  handler: Handler | null,
  options?: AddEventListenerOptions,
) {
  useEffect(() => {
    if (!handler) {
      return;
    }

    const listener = (event: PossibleEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    events.forEach((event) => {
      document.addEventListener(event, listener, options);
    });

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, listener);
      });
    };
  }, [handler, options, ref]);
}
```

# Dialog

## demo

<code src="./demo.tsx"></code>

#### 嵌套 Dialog 点击外部关闭一层弹窗

content,overlay 阻止冒泡,overlay 点击关闭

```ts
// Portal,就是黑色半透明的 overlay 层
    <Portal
      onKeyDown={(e) => {
        e.stopPropagation(); // 阻止冒泡
        if (e.key === 'Escape') {
          onDismiss();  // 关闭当前层
        }
      }}
      onClick={(e) => {
        e.stopPropagation(); // 阻止冒泡
        onDismiss(); // 关闭当前层
      }}

``
// content 层
    <div
      ref={contentRef}
      onClick={(e) => e.stopPropagation()} // 阻止冒泡
      ...
```

#### 添加过渡动画

复合组件的优势: 我可以不用修改原有代码,在其基础上二次封装个带过渡动画的 Dialog

```ts
import { animated, useTransition } from '@react-spring/web';
import { DialogContent, DialogOverlay, DialogProps } from './index';
import React from 'react';
function noop() {}
function AnimatedDialog({
  children,
  isOpen = false,
  onDismiss = noop,
}: DialogProps) {
  const AnimatedDialogOverlay = animated(DialogOverlay);
  const AnimatedDialogContent = animated(DialogContent);

  const transition = useTransition(isOpen, {
    from: {
      opacity: 0,
      scale: 0,
    },
    enter: {
      opacity: 1,
      scale: 1,
    },
    leave: {
      opacity: 0,
      scale: 0,
    },
  });
  return (
    <>
      {transition((style, item) => {
        return (
          <AnimatedDialogOverlay
            isOpen={item}
            onDismiss={onDismiss}
            style={{ opacity: style.opacity }}
          >
            <AnimatedDialogContent style={style}>
              {children}
            </AnimatedDialogContent>
          </AnimatedDialogOverlay>
        );
      })}
    </>
  );
}

export default AnimatedDialog;
```

#### 使用

```ts | pure
import { css } from '@emotion/react';
import { useState } from 'react';
// import { Dialog } from './index';
import AnimatedDialog from './AnimatedDialog';

function Demo() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnotherOpen, setIsAnotherOpen] = useState(false);

  return (
    <div>
      <button type="button" onClick={() => setIsOpen(true)}>
        open
      </button>
      <AnimatedDialog
        isOpen={isOpen}
        onDismiss={() => {
          setIsOpen(false);
        }}
      >
        <div
          css={css`
            width: 100px;
            height: 100px;
          `}
        >
          hello AnimatedDialog
        </div>
        <div
          css={css`
            display: flex;
            justify-content: end;
            column-gap: 6px;
          `}
        >
          <button type="button" onClick={() => setIsOpen(false)}>
            close
          </button>
          <button type="button" onClick={() => setIsAnotherOpen(true)}>
            open another
          </button>
        </div>
        <AnimatedDialog
          isOpen={isAnotherOpen}
          onDismiss={() => {
            setIsAnotherOpen(false);
          }}
        >
          <div>hello AnimatedDialog</div>
          <div>
            <button type="button" onClick={() => setIsAnotherOpen(false)}>
              close another
            </button>
          </div>
        </AnimatedDialog>
      </AnimatedDialog>
    </div>
  );
}

export default Demo;
```

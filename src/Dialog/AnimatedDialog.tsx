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

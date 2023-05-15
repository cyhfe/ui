import { css } from '@emotion/react';
import { animated, useSpring } from '@react-spring/web';
import React, { ComponentProps, useRef } from 'react';
import Portal, { type PortalProps } from '../Portal';
import { createContext } from '../createContext';
interface DialogProps {
  children?: React.ReactNode;
  isOpen: boolean;
  onDismiss?: () => void;
}
interface DialogCOntextValue {
  isOpen: boolean;
  onDismiss: () => void;
}

function noop() {}

const [DialogContextProvider] =
  createContext<DialogCOntextValue>('DialogContext');

interface DialogWrapperProps extends PortalProps {
  isOpen?: boolean;
  onDismiss?: () => void;
}

function DialogWrapper({
  isOpen = true,
  onDismiss = noop,
  children,
  ...props
}: DialogWrapperProps) {
  return (
    <Portal
      onKeyDown={(e) => {
        e.stopPropagation();
        if (e.key === 'Escape') {
          onDismiss();
        }
      }}
      onClick={(e) => {
        e.stopPropagation();
        onDismiss();
      }}
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: hsla(0, 0%, 0%, 0.33);
        z-index: 99;
      `}
      {...props}
    >
      <DialogContextProvider isOpen={isOpen} onDismiss={onDismiss}>
        {children}
      </DialogContextProvider>
    </Portal>
  );
}

function DialogOverlay({ children, isOpen, onDismiss, ...props }: DialogProps) {
  return isOpen ? (
    <DialogWrapper isOpen={isOpen} onDismiss={onDismiss} {...props}>
      {children}
    </DialogWrapper>
  ) : null;
}

interface DialogContentProps extends ComponentProps<'div'> {
  children?: React.ReactNode;
  isOpen: boolean;
}

function DialogContent({ children, isOpen, ...rest }: DialogContentProps) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const style = useSpring({
    opcity: isOpen ? 1 : 0,
    duration: 3000,
  });

  return (
    <animated.div
      style={style}
      ref={contentRef}
      onClick={(e) => e.stopPropagation()}
      css={css`
        min-width: 400px;
        padding: 2rem;
        background: white;
        border-radius: 8px;
      `}
      {...rest}
    >
      {children}
    </animated.div>
  );
}

function Dialog({ children, isOpen = false, onDismiss = noop }: DialogProps) {
  return (
    <DialogOverlay isOpen={isOpen} onDismiss={onDismiss}>
      <DialogContent isOpen={isOpen}>{children}</DialogContent>
    </DialogOverlay>
  );
}

export { DialogWrapper, DialogOverlay, DialogContent, Dialog };

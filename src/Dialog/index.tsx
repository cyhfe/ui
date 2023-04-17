/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import React, { ComponentProps, PropsWithChildren, useRef } from 'react';
import { createContext } from '../createContext';
import Portal, { type PortalProps } from '../Portal';

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
  const mouseDownTarget = useRef<EventTarget | null>(null);
  return (
    <Portal
      onKeyDown={(e) => {
        e.stopPropagation();
        if (e.key === 'Escape') {
          onDismiss();
        }
      }}
      onMouseDown={(e) => {
        mouseDownTarget.current = e.target;
        console.log('mousedown', e.target);
      }}
      onClick={(e) => {
        console.log('click', e.target);
        if (mouseDownTarget.current === e.target) {
          e.stopPropagation();
          onDismiss();
        }
      }}
      css={css`
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
function DialogInner({ children }: PropsWithChildren) {
  return <div>{children}</div>;
}
function DialogOverlay({ children, isOpen, onDismiss, ...props }: DialogProps) {
  return isOpen ? (
    <DialogWrapper isOpen={isOpen} onDismiss={onDismiss} {...props}>
      <DialogInner>{children}</DialogInner>
    </DialogWrapper>
  ) : null;
}

interface DialogContentProps extends ComponentProps<'div'> {
  children?: React.ReactNode;
}

function DialogContent({ children }: DialogContentProps) {
  const contentRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={contentRef}
      onClick={(e) => e.stopPropagation()}
      css={css`
        width: 50vw;
        margin: 10vh auto;
        background: white;
        padding: 2rem;
        outline: none;
      `}
    >
      {children}
    </div>
  );
}

interface DialogProps {
  children?: React.ReactNode;
  isOpen: boolean;
  onDismiss?: () => void;
}

function Dialog({ children, isOpen = false, onDismiss = noop }: DialogProps) {
  return (
    <DialogOverlay isOpen={isOpen} onDismiss={onDismiss}>
      <DialogContent>{children}</DialogContent>
    </DialogOverlay>
  );
}

export { DialogWrapper, DialogOverlay, DialogContent, Dialog };

/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import React, { ComponentProps, useEffect, useRef } from 'react';
import { createContext } from '../createContext';
import Portal, { type PortalProps } from '../Portal';
import { useOnClickOutside } from '../useClickOutside';

interface DialogCOntextValue {
  isOpen: boolean;
  onDismiss: () => void;
}

function noop() {}

const [DialogContextProvider, useDialogContext] =
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

function DialogOverlay({ children, isOpen, ...props }: DialogProps) {
  return isOpen ? (
    <DialogWrapper isOpen={isOpen} {...props}>
      {children}
    </DialogWrapper>
  ) : null;
}

interface DialogContentProps extends ComponentProps<'div'> {
  children?: React.ReactNode;
}

function DialogContent({ children }: DialogContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const { onDismiss } = useDialogContext('DialogContent');
  useOnClickOutside(contentRef, onDismiss);
  useEffect(() => {
    contentRef.current?.focus();
  }, []);
  return (
    <div
      ref={contentRef}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          onDismiss();
        }
      }}
      onClick={(e) => {
        console.log('click', e.target);
      }}
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

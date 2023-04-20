import React, { ComponentProps } from 'react';
import { type PortalProps } from '../Portal';
interface DialogProps {
    children?: React.ReactNode;
    isOpen: boolean;
    onDismiss?: () => void;
}
interface DialogWrapperProps extends PortalProps {
    isOpen?: boolean;
    onDismiss?: () => void;
}
declare function DialogWrapper({ isOpen, onDismiss, children, ...props }: DialogWrapperProps): import("@emotion/react/jsx-runtime").JSX.Element;
declare function DialogOverlay({ children, isOpen, onDismiss, ...props }: DialogProps): import("@emotion/react/jsx-runtime").JSX.Element | null;
interface DialogContentProps extends ComponentProps<'div'> {
    children?: React.ReactNode;
}
declare function DialogContent({ children }: DialogContentProps): import("@emotion/react/jsx-runtime").JSX.Element;
declare function Dialog({ children, isOpen, onDismiss }: DialogProps): import("@emotion/react/jsx-runtime").JSX.Element;
export { DialogWrapper, DialogOverlay, DialogContent, Dialog };

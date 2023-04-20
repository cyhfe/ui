import React from 'react';
interface Toast {
    id: number;
    type: 'info' | 'success' | 'error';
    message?: string;
    autoClose?: boolean;
    node?: React.ReactNode;
}
export declare type Position = 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center';
interface ToastContextValue {
    enqueueToast: (toast: Omit<Toast, 'id'>) => void;
    remove: (id: number) => void;
    queue: Toast[];
    setQueue: React.Dispatch<React.SetStateAction<Toast[]>>;
    duration: number;
    autoClose: boolean;
    position: Position;
}
interface ToastProps {
    children?: React.ReactNode;
    max?: number;
    duration?: number;
    autoClose?: boolean;
    position?: Position;
}
interface ToastItemProps {
    type: 'info' | 'success' | 'error';
    message?: string;
    duration: number;
    onExpire: () => void;
    onRemove: () => void;
    autoClose: boolean;
    node?: React.ReactNode;
}
declare const useToast: (callerComponentName: string) => ToastContextValue;
declare function ToastItem({ type, message, onExpire, duration, onRemove, autoClose, node, }: ToastItemProps): import("@emotion/react/jsx-runtime").JSX.Element;
declare function ToastContainer(): import("@emotion/react/jsx-runtime").JSX.Element;
declare function ToastRoot({ children, max, duration, autoClose, position, }: ToastProps): import("@emotion/react/jsx-runtime").JSX.Element;
export { ToastContainer, ToastItem, ToastRoot, useToast };

/** @jsxImportSource @emotion/react */

import { css, SerializedStyles } from '@emotion/react';
import React from 'react';
import { createContext } from '../createContext';
import Portal from '../Portal';

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

interface Toast {
  id: number;
  type: 'info' | 'success' | 'error';
  message?: string;
  autoClose?: boolean;
  node?: React.ReactNode;
}

export type Position =
  | 'top-left'
  | 'top-right'
  | 'top-center'
  | 'bottom-left'
  | 'bottom-right'
  | 'bottom-center';

type PositionStyle = {
  [position in Position]: SerializedStyles;
};

interface ToastItemProps {
  type: 'info' | 'success' | 'error';
  message?: string;
  duration: number;
  onExpire: () => void;
  onRemove: () => void;
  autoClose: boolean;
  node?: React.ReactNode;
}

const DEFAULT_DURATION = 3000;
let ToastID = 0;

const [ToastProvider, useToast] = createContext<ToastContextValue>('Toast');

class Timer {
  handler: TimerHandler;
  delay: number;
  timerId: number | null = null;
  remaining: number;
  startTime: number | undefined;

  constructor(handler: TimerHandler, delay: number) {
    this.handler = handler;
    this.delay = delay;
    this.remaining = delay;
  }

  start() {
    this.startTime = Date.now();
    this.timerId = setTimeout(this.handler, this.delay);
  }

  pause() {
    if (!this.timerId || !this.startTime) return;
    this.remaining = this.remaining - (Date.now() - this.startTime);
    clearTimeout(this.timerId);
    this.timerId = null;
  }
  resume() {
    this.startTime = Date.now();
    this.timerId = setTimeout(this.handler, this.remaining);
  }
  clear() {
    if (!this.timerId) return;
    clearTimeout(this.timerId);
    this.timerId = null;
  }
}

function ToastItem({
  type = 'info',
  message,
  onExpire,
  duration,
  onRemove,
  autoClose,
  node,
}: ToastItemProps) {
  const timerRef = React.useRef(new Timer(onExpire, duration));
  React.useEffect(() => {
    autoClose && timerRef.current.start();
    return () => {
      autoClose && timerRef.current.clear();
    };
  }, [autoClose]);
  const colorByType =
    type === 'success' ? '#52c41a' : type === 'error' ? '#ff4d4f' : '#1677ff';

  return (
    <div
      css={css`
        padding: 0.5rem 0.5rem 0.5rem 0.75rem;
        margin-bottom: 12px;
        background-color: #ffffff;
        display: flex;
        justify-content: space-between;
        border-left: 14px solid ${colorByType};
        border-radius: 6px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.12);
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        :hover {
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2),
            0 5px 5px rgba(0, 0, 0, 0.17);
        }
      `}
      onMouseEnter={() => {
        autoClose && timerRef.current.pause();
      }}
      onMouseLeave={() => {
        autoClose && timerRef.current.resume();
      }}
    >
      {message && message}
      {node && node}
      <svg
        onClick={onRemove}
        width="10"
        height="10"
        viewBox="0 0 12 12"
        css={css`
          cursor: pointer;
          fill: #bfbfbf;
          transition: all 0.2s ease-in-out;
          :hover {
            width: 12px;
            height: 12px;
            fill: #434343;
          }
        `}
      >
        <path d="M7.17495 5.99999L10.7583 2.42499C10.9152 2.26807 11.0034 2.05524 11.0034 1.83333C11.0034 1.61141 10.9152 1.39858 10.7583 1.24166C10.6014 1.08474 10.3885 0.996582 10.1666 0.996582C9.9447 0.996582 9.73187 1.08474 9.57495 1.24166L5.99995 4.82499L2.42495 1.24166C2.26803 1.08474 2.0552 0.996582 1.83328 0.996582C1.61136 0.996582 1.39854 1.08474 1.24162 1.24166C1.0847 1.39858 0.996539 1.61141 0.996539 1.83333C0.996539 2.05524 1.0847 2.26807 1.24162 2.42499L4.82495 5.99999L1.24162 9.57499C1.16351 9.65246 1.10151 9.74463 1.05921 9.84618C1.0169 9.94773 0.995117 10.0566 0.995117 10.1667C0.995117 10.2767 1.0169 10.3856 1.05921 10.4871C1.10151 10.5887 1.16351 10.6809 1.24162 10.7583C1.31908 10.8364 1.41125 10.8984 1.5128 10.9407C1.61435 10.983 1.72327 11.0048 1.83328 11.0048C1.94329 11.0048 2.05221 10.983 2.15376 10.9407C2.25531 10.8984 2.34748 10.8364 2.42495 10.7583L5.99995 7.17499L9.57495 10.7583C9.65242 10.8364 9.74459 10.8984 9.84614 10.9407C9.94768 10.983 10.0566 11.0048 10.1666 11.0048C10.2766 11.0048 10.3855 10.983 10.4871 10.9407C10.5886 10.8984 10.6808 10.8364 10.7583 10.7583C10.8364 10.6809 10.8984 10.5887 10.9407 10.4871C10.983 10.3856 11.0048 10.2767 11.0048 10.1667C11.0048 10.0566 10.983 9.94773 10.9407 9.84618C10.8984 9.74463 10.8364 9.65246 10.7583 9.57499L7.17495 5.99999Z" />
      </svg>
    </div>
  );
}
function ToastContainer() {
  const {
    queue,
    duration,
    remove,
    autoClose: defaultAutoClose,
    position,
  } = useToast('ToastContainer');

  const baseStyle = css`
    position: fixed;
    width: 200px;
    z-index: 999;
  `;

  const positionStyle: PositionStyle = {
    'top-left': css`
      top: 16px;
      left: 16px;
    `,
    'top-right': css`
      top: 16px;
      right: 16px;
    `,
    'top-center': css`
      top: 16px;
      left: 50%;
      transform: translateX(-50%);
    `,
    'bottom-left': css`
      bottom: 16px;
      left: 16px;
    `,
    'bottom-right': css`
      bottom: 16px;
      right: 16px;
    `,
    'bottom-center': css`
      bottom: 16px;
      left: 50%;
      transform: translateX(-50%);
    `,
  };

  return (
    <Portal
      className="toastContainer"
      css={[baseStyle, positionStyle[position]]}
    >
      {queue.map(
        ({ type, message, id, autoClose = defaultAutoClose, node }) => {
          return (
            <ToastItem
              type={type}
              key={id}
              message={message}
              duration={duration}
              onExpire={() => remove(id)}
              onRemove={() => remove(id)}
              autoClose={autoClose}
              node={node}
            ></ToastItem>
          );
        },
      )}
    </Portal>
  );
}

function ToastRoot({
  children,
  max,
  duration = DEFAULT_DURATION,
  autoClose = false,
  position = 'top-right',
}: ToastProps) {
  const [queue, setQueue] = React.useState<Toast[]>([]);

  const add = (toast: Omit<Toast, 'id'>) => {
    if (max && queue.length >= max) return;
    const toastWithId = {
      ...toast,
      id: ToastID++,
    };
    setQueue((queue) => [...queue, toastWithId]);
  };

  const remove = (id: number) => {
    setQueue((queue) => [...queue.filter((toast) => toast.id !== id)]);
  };

  return (
    <ToastProvider
      duration={duration}
      enqueueToast={add}
      remove={remove}
      queue={queue}
      setQueue={setQueue}
      autoClose={autoClose}
      position={position}
    >
      {children}
      <ToastContainer />
    </ToastProvider>
  );
}

export { ToastContainer, ToastItem, ToastRoot, useToast };

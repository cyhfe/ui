import { createMachine } from '@cyhfe/state-machine/dist/index';
import { css } from '@emotion/react';
import React, { useEffect, useRef, useState } from 'react';
import Portal from '../Portal';
import useRect from '../useRect';

let GlobalTooltipId: number | null = null;
let genID = 0;

const MOUSE_REST_TIMEOUT = 100;
const LEAVE_TIMEOUT = 300;

enum TooltipStates {
  Idle = 'IDLE',

  Focused = 'FOCUSED',

  Visible = 'VISIBLE',

  LeavingVisible = 'LEAVING_VISIBLE',

  Dismissed = 'DISMISSED',
}

enum TooltipEvents {
  Blur = 'BLUR',
  Focus = 'FOCUS',
  MouseDown = 'MOUSE_DOWN',
  MouseEnter = 'MOUSE_ENTER',
  MouseLeave = 'MOUSE_LEAVE',
  MouseMove = 'MOUSE_MOVE',
  Rest = 'REST',
  TimeComplete = 'TIME_COMPLETE',
}

let restTimeout: number;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let send = (_event: TooltipEvents) => {};

function startRestTimer() {
  window.clearTimeout(restTimeout);
  restTimeout = window.setTimeout(() => {
    send(TooltipEvents.Rest);
  }, MOUSE_REST_TIMEOUT);
}

function clearRestTimer() {
  window.clearTimeout(restTimeout);
}

let leavingVisibleTimer: number;

function startLeavingVisibleTimer() {
  window.clearTimeout(leavingVisibleTimer);
  leavingVisibleTimer = window.setTimeout(
    () => send(TooltipEvents.TimeComplete),
    LEAVE_TIMEOUT,
  );
}

function clearLeavingVisibleTimer() {
  window.clearTimeout(leavingVisibleTimer);
}

const chart = {
  initialState: TooltipStates.Idle,
  states: {
    [TooltipStates.Idle]: {
      actions: {},
      transitions: {
        [TooltipEvents.MouseEnter]: {
          target: TooltipStates.Focused,
        },
        [TooltipEvents.Focus]: {
          target: TooltipStates.Visible,
        },
      },
    },
    [TooltipStates.Focused]: {
      actions: {
        onEnter: startRestTimer,
        onExit: clearRestTimer,
      },
      transitions: {
        [TooltipEvents.MouseMove]: {
          target: TooltipStates.Focused,
        },
        [TooltipEvents.MouseLeave]: {
          target: TooltipStates.Idle,
        },
        [TooltipEvents.MouseDown]: {
          target: TooltipStates.Dismissed,
        },
        [TooltipEvents.Blur]: {
          target: TooltipStates.Idle,
        },
        [TooltipEvents.Rest]: {
          target: TooltipStates.Visible,
        },
      },
    },
    [TooltipStates.Visible]: {
      transitions: {
        [TooltipEvents.Focus]: {
          target: TooltipStates.Focused,
        },
        [TooltipEvents.MouseEnter]: {
          target: TooltipStates.Focused,
        },
        [TooltipEvents.MouseLeave]: {
          target: TooltipStates.LeavingVisible,
        },
        [TooltipEvents.Blur]: {
          target: TooltipStates.LeavingVisible,
        },
        [TooltipEvents.MouseDown]: {
          target: TooltipStates.Dismissed,
        },
      },
    },
    [TooltipStates.LeavingVisible]: {
      actions: {
        onEnter: startLeavingVisibleTimer,
        onExit: () => {
          clearLeavingVisibleTimer();
        },
      },
      transitions: {
        [TooltipEvents.MouseEnter]: {
          target: TooltipStates.Visible,
        },
        [TooltipEvents.Focus]: {
          target: TooltipStates.Visible,
        },
        [TooltipEvents.TimeComplete]: {
          target: TooltipStates.Idle,
        },
      },
    },
    [TooltipStates.Dismissed]: {
      actions: {
        onEnter: startLeavingVisibleTimer,
      },
      transitions: {
        [TooltipEvents.MouseLeave]: {
          target: TooltipStates.Idle,
        },
        [TooltipEvents.Blur]: {
          target: TooltipStates.Idle,
        },
      },
    },
  },
};

const machine = createMachine(chart);
send = machine.send.bind(machine);

function useId() {
  const [id] = useState(() => {
    return genID++;
  });
  return id;
}

interface TooltipProps {
  children: React.ReactNode;
  label: string;
}

interface TooltipPopupProps {
  label: string;
  triggerRef: React.MutableRefObject<HTMLElement | null>;
  isVisible: boolean;
}

function TooltipPopup({ label, triggerRef, isVisible }: TooltipPopupProps) {
  const ownRef = useRef<HTMLDivElement | null>(null);

  const ownRect = useRect(ownRef, {
    observe: isVisible,
    // onChange: (r) => {
    //   console.log('ownRect', r);
    // },
  });
  const triggerRect = useRect(triggerRef, {
    observe: isVisible,
    // onChange: (r) => {
    //   console.log('triggerRect', r);
    // },
  });

  function getPisition(triggerRect: DOMRect | null, ownRect: DOMRect | null) {
    console.log('get position');
    if (!triggerRect || !ownRect) return css({ left: 0, top: 0 });
    const x = triggerRect.left + triggerRect.width / 2 - ownRect.width / 2;
    const y = triggerRect.bottom + 15;
    return css({ left: x + 'px', top: y + 'px' });
  }

  return isVisible ? (
    <Portal>
      <div
        ref={ownRef}
        css={[
          css`
            position: fixed;
            z-index: 99;
          `,
          getPisition(triggerRect, ownRect),
        ]}
      >
        <div
          css={css`
            padding: 0.5rem;
            background: #40a9ff;
            border-radius: 8px;
            color: #fff;
          `}
        >
          <div
            css={css`
              width: 0px;
              height: 0px;
              position: absolute;
              top: -8px;
              left: 50%;
              transform: translateX(-50%);
              width: 0;
              border-left: 8px solid transparent;
              border-right: 8px solid transparent;
              border-bottom: 8px solid #40a9ff;
            `}
          ></div>
          {label}
        </div>
      </div>
    </Portal>
  ) : null;
}

function isTooltipVisible(id: number | null) {
  if (id !== GlobalTooltipId) return false;
  return (
    machine.state === TooltipStates.Visible ||
    machine.state === TooltipStates.LeavingVisible
  );
}

function Tooltip({ children, label }: TooltipProps) {
  const id = useId();
  const onMouseDown = () => {
    GlobalTooltipId = id;
    send(TooltipEvents.MouseDown);
  };
  const onBlur = () => {
    GlobalTooltipId = null;

    send(TooltipEvents.Blur);
  };
  const onFocus = () => {
    GlobalTooltipId = id;
    send(TooltipEvents.Focus);
  };
  const onMouseEnter = () => {
    GlobalTooltipId = id;
    send(TooltipEvents.MouseEnter);
  };
  const onMouseLeave = () => {
    send(TooltipEvents.MouseLeave);
  };
  const onMouseMove = () => {
    GlobalTooltipId = id;
    send(TooltipEvents.MouseMove);
  };
  const trigger = {
    onMouseDown,
    onBlur,
    onFocus,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
  };
  const triggerRef = useRef<HTMLElement | null>(null);

  const child = React.Children.only(children) as any;

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    return machine.subscribe(() => {
      setIsVisible(isTooltipVisible(id));
    });
  }, [id]);
  return (
    <>
      {React.cloneElement(child, {
        ref: triggerRef,
        ...trigger,
      })}
      <TooltipPopup
        label={label}
        triggerRef={triggerRef}
        isVisible={isVisible}
      />
    </>
  );
}

export { Tooltip, machine };

/* eslint-disable @typescript-eslint/no-unused-vars */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useStatefulRefValue } from 'rcl/useStatefulRefValue';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Portal from '../Portal';

let GlobalTooltipId = null;
let genID = 0;

const MOUSE_REST_TIMEOUT = 300;
const LEAVE_TIMEOUT = 500;

function useId() {
  const [id, setId] = useState<number | null>(null);
  useLayoutEffect(() => {
    setId(genID++);
  }, []);
  return id;
}

interface TooltipProps {
  children: React.ReactNode;
  label: string;
}

function useTooltip() {}

interface TooltipPopupProps {
  label: string;
  triggerElement: HTMLElement | null;
}

function TooltipPopup({ label, triggerElement }: TooltipPopupProps) {
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const ownRef = useRef<HTMLDivElement | null>(null);
  const [ownElement, ownRefCallback] = useStatefulRefValue(ownRef, null);
  useEffect(() => {
    const triggerRect = triggerElement?.getBoundingClientRect();
    const ownRect = ownElement?.getBoundingClientRect();

    if (!triggerRect || !ownRect) return;
    const top = triggerRect.bottom;
    const left = triggerRect.left + triggerRect.width / 2 - ownRect.width / 2;
    console.log(triggerRect, ownRect);
    setTop(top);
    setLeft(left);
  }, [ownElement, triggerElement]);
  return (
    <Portal
      ref={ownRefCallback}
      css={css`
        position: absolute;
        top: ${top}px;
        left: ${left}px;
      `}
    >
      {label}
    </Portal>
  );
}

function Tooltip({ children, label }: TooltipProps) {
  // const id = useId();
  const triggerRef = useRef<HTMLElement | null>(null);
  const [triggerElement, triggerRefCallback] = useStatefulRefValue(
    triggerRef,
    null,
  );
  const child = React.Children.only(children) as any;
  return (
    <>
      {React.cloneElement(child, {
        ref: triggerRefCallback,
      })}
      <TooltipPopup label={label} triggerElement={triggerElement} />
    </>
  );
}

export { Tooltip };

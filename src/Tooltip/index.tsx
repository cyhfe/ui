import React, {
  cloneElement,
  forwardRef,
  Fragment,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { Portal } from '../Portal/index';

import './style.less';

interface TooltipProps {
  label: string;
  children: React.ReactNode;
}

function Tooltip({ label, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  function positionTooltip(trigger: HTMLDivElement, popup: HTMLDivElement) {
    const triggerRect = trigger.getBoundingClientRect();
    const popupRect = popup.getBoundingClientRect();

    popup.style.left = triggerRect.left + triggerRect.width / 2 - popupRect.width / 2 + 'px';
    popup.style.top = triggerRect.bottom + 12 + 'px';
  }

  useLayoutEffect(() => {
    isVisible &&
      triggerRef.current &&
      popupRef.current &&
      positionTooltip(triggerRef.current, popupRef.current);
  }, [isVisible]);

  const child = React.Children.only(children) as any;

  function handleMouseEnter() {
    setIsVisible(true);
  }

  function handleMouseLeave() {
    setIsVisible(false);
  }

  return (
    <React.Fragment>
      {isVisible && (
        <Portal>
          <div className="tooltip-popup" ref={popupRef}>
            {label}
          </div>
        </Portal>
      )}
      {React.cloneElement(child, {
        ref: triggerRef,
        onMouseOver: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
      })}
    </React.Fragment>
  );
}

interface TooltipContentProps {
  children: React.ReactNode;
}

const TooltipContent = forwardRef(function TooltipContent({ children }: TooltipContentProps, ref) {
  return <Fragment>{children}</Fragment>;
});

export { Tooltip };

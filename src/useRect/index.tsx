import { useStableCallback } from 'rcl/useStableCallback';
import React from 'react';
import observeRect from './observeRect';

function useRect(
  ref: React.RefObject<HTMLElement | null>,
  options: {
    observe?: boolean;
    onChange?: (rect: DOMRect) => void;
  } = { observe: true },
) {
  const { observe, onChange } = options;

  const stableOnchange = useStableCallback(onChange);

  const [rect, setRect] = React.useState<DOMRect | null>(null);
  const [element, setElement] = React.useState(ref.current);
  const initialRectIsSet = React.useRef(false);

  React.useEffect(() => {
    setElement(ref.current);
    return () => {
      setElement(null);
    };
  }, [ref]);

  React.useLayoutEffect(() => {
    if (!element) return;
    if (!observe) {
      if (!initialRectIsSet.current) {
        setRect(element.getBoundingClientRect());
        stableOnchange(element.getBoundingClientRect());
      }
      return;
    }
    let observal = observeRect(element, (rect) => {
      setRect(rect);
      stableOnchange(rect);
    });

    observal.observe();
    return () => {
      observal.unobserve();
    };
  }, [element, observe, stableOnchange]);
  return rect;
}

export default useRect;

import React, { useLayoutEffect } from 'react';
import observeRect from './observeRect';

function useRect(
  ref: React.RefObject<HTMLElement | null>,
  options: {
    observe?: boolean;
    onChange?: (rect: DOMRect) => void;
  } = {},
) {
  const { observe = true, onChange = () => {} } = options;
  const [rect, setRect] = React.useState<DOMRect | null>(null);
  const [element, setElement] = React.useState<HTMLElement | null>(ref.current);

  const savedOnchange = React.useRef(onChange);
  const savedElement = React.useRef(ref.current);
  const initialRectSet = React.useRef(false);

  // 更新 onChange, savedElement
  useLayoutEffect(() => {
    savedElement.current = ref.current;
    savedOnchange.current = onChange;
  });

  // 更新 element

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    if (element !== savedElement.current) {
      // console.log('更新 element', element, savedElement.current);
      setElement(savedElement.current);
    }
  });

  // 初次渲染更新rect
  useLayoutEffect(() => {
    if (!initialRectSet.current) {
      if (!element) {
        return;
      }

      // console.log(element, element.getBoundingClientRect(), '初次渲染更新rect');

      const nextRect = element.getBoundingClientRect();
      setRect(nextRect);
      savedOnchange.current(nextRect);
      initialRectSet.current = true;
    }
  }, [element]);

  // 订阅及取消订阅
  useLayoutEffect(() => {
    if (!observe || !element) return;
    const observor = observeRect(element, (rect) => {
      savedOnchange.current(rect);
      setRect(rect);
    });
    observor.observe();
    return () => {
      observor.unobserve();
    };
  }, [element, observe]);

  return rect;
}

export default useRect;

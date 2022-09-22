import React, { useLayoutEffect, useRef, useState } from 'react';

let props: (keyof DOMRect)[] = ['bottom', 'height', 'left', 'right', 'top', 'width'];

let rectChanged = (a: DOMRect = {} as DOMRect, b: DOMRect = {} as DOMRect) =>
  props.some((prop) => a[prop] !== b[prop]);

let observedNodes = new Map<Element, RectProps>();

let rafId: number;

let run = () => {
  const changedStates: RectProps[] = [];
  observedNodes.forEach((state, node) => {
    let newRect = node.getBoundingClientRect();
    if (rectChanged(state.rect, newRect)) {
      state.rect = newRect;
      changedStates.push(state);
    }
  });

  changedStates.forEach((state) => {
    state.callbacks.forEach((cb) => cb(state.rect));
  });

  rafId = requestAnimationFrame(run);
};

export function observeRect(node: Element, cb: (rect: DOMRect) => void) {
  return {
    observe() {
      let wasEmpty = observedNodes.size === 0;
      if (observedNodes.has(node)) {
        observedNodes.get(node)!.callbacks.push(cb);
      } else {
        observedNodes.set(node, {
          rect: undefined,
          hasRectChanged: false,
          callbacks: [cb],
        });
      }

      if (wasEmpty) run();
    },

    unobserve() {
      let state = observedNodes.get(node);
      if (state) {
        const index = state.callbacks.indexOf(cb);
        if (index >= 0) state.callbacks.splice(index, 1);

        if (!state.callbacks.length) observedNodes.delete(node);

        if (!observedNodes.size) cancelAnimationFrame(rafId);
      }
    },
  };
}

interface Options {
  onChange?: (rect: DOMRect) => void;
  observe?: boolean;
}

const useRect = (nodeRef: React.RefObject<Element | undefined | null>, options: Options = {}) => {
  console.log('useRect');
  const { onChange, observe } = options;

  const [rect, setRect] = useState<DOMRect | null>(null);
  const [element, setElement] = useState(nodeRef.current);

  const initialRectIsSet = useRef(false);
  const initialRefIsSet = useRef(false);

  let onChangeRef = React.useRef(onChange);

  useLayoutEffect(() => {
    onChangeRef.current = onChange;

    if (nodeRef.current !== element) {
      setElement(nodeRef.current);
    }
  });

  useLayoutEffect(() => {
    if (element && !initialRectIsSet.current) {
      initialRectIsSet.current = true;
      setRect(element.getBoundingClientRect());
    }
  }, [element]);

  useLayoutEffect(() => {
    if (!observe) return;

    let elem = element;
    if (!initialRefIsSet.current) {
      initialRefIsSet.current = true;
      elem = nodeRef.current;
    }

    if (!elem) return;

    const observer = observeRect(elem, (rect) => {
      setRect(rect);
      onChange?.(rect);
    });
    observer.observe();
    return () => {
      observer.unobserve();
    };
  }, [observe, element, nodeRef]);

  return rect;
};

export type RectProps = {
  rect: DOMRect | undefined;
  hasRectChanged: boolean;
  callbacks: Function[];
};

export { useRect };

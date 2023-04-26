import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import observeRect from './observeRect';

export default function Example() {
  const [observe, setObserve] = React.useState(false);
  // your own ref
  const ref = React.useRef<HTMLDivElement>(null);

  const [rect, setRect] = useState<DOMRect | null>(null);
  const [element, setElement] = useState(ref.current);
  const initialRectIsSet = useRef(false);

  useEffect(() => {
    setElement(ref.current);
    return () => {
      setElement(null);
    };
  }, []);

  useLayoutEffect(() => {
    if (!element) return;
    if (!observe) {
      if (!initialRectIsSet.current) {
        setRect(element.getBoundingClientRect());
      }
      return;
    }
    let observal = observeRect(element, (rect) => {
      setRect(rect);
    });
    observal.observe();
    return () => {
      observal.unobserve();
    };
  }, [element, observe]);

  return (
    <div>
      <button type="button" onClick={() => setObserve(!observe)}>
        {observe ? 'Stop' : 'Start'} observing
      </button>
      <pre>{JSON.stringify(rect, null, 2)}</pre>
      <div
        // and then place the ref
        ref={ref}
        contentEditable
        style={{
          display: 'inline-block',
          padding: 10,
          border: 'solid 1px',
        }}
        dangerouslySetInnerHTML={{
          __html: 'Edit this to change the size!',
        }}
      />
    </div>
  );
}

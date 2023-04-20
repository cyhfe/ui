import React from 'react';
import { useRect } from '.';

export default function Example() {
  const [observe, setObserve] = React.useState(true);
  // your own ref
  const ref = React.useRef<HTMLDivElement>(null);

  // pass it in to be observered
  const rect = useRect(ref, { observe });

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

import React from 'react';

import useRect from '.';

export default function Example() {
  const ref = React.useRef<HTMLDivElement>(null);
  const [observe, setObserve] = React.useState(false);

  const rect = useRect(ref, {
    observe,
    onChange: (arg) => {
      console.log(arg, 'onchange');
    },
  });

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

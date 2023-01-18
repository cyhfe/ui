import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

function useEffectOnlyOnUpdate(
  callback: (dependencies: React.DependencyList | undefined) => void,
  dependencies: React.DependencyList | undefined,
) {
  const didMount = useRef(false);
  const callbackRef = useRef<typeof callback | null>(null);

  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    if (didMount.current) {
      callbackRef.current?.(dependencies);
    } else {
      didMount.current = true;
    }
  }, [dependencies]);
}

function Demo() {
  const [toggle, setToggle] = useState(false);

  useEffectOnlyOnUpdate(
    (toggle) => {
      console.log(toggle);
    },
    [toggle],
  );

  return (
    <div>
      <button onClick={() => setToggle((t) => !t)}>toggle</button>
      <div>{toggle ? 'true' : 'false'}</div>
    </div>
  );
}

export default Demo;

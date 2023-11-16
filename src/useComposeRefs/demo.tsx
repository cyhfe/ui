import React, { useEffect } from 'react';
import { useComposeRefs } from '.';
export default function Demo() {
  const ref1 = React.useRef<HTMLDivElement | null>(null);
  const ref2 = React.useRef<HTMLDivElement | null>(null);

  const callbackRef = (node: HTMLDivElement) => {
    ref2.current = node;
  };

  useEffect(() => {
    console.log(ref1.current, ref2.current);
  }, []);

  const composeRefs = useComposeRefs(ref1, callbackRef);
  return <div ref={composeRefs}>compose refs</div>;
}

import { useSpring, animated } from '@react-spring/web';
import { useState } from 'react';

export default function MyComponent() {
  const [t, setT] = useState(1);
  const props = useSpring({
    from: {
      x: 0,
    },
    to: {
      x: t,
    },
  });

  return (
    <div>
      <input
        type="range"
        max={1}
        min={0}
        value={t}
        onChange={(e) => setT(Number(e.target.value))}
        step={0.01}
      />
      <animated.div>{props.x.to((x) => x)}</animated.div>
    </div>
  );
}

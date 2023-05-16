import { animated, useSpring } from '@react-spring/web';
import { useState } from 'react';

function Breath() {
  const [isBreathing, setIsBreathing] = useState(true);
  const [props] = useSpring(
    () => ({
      from: {
        opacity: 0.6,
        scale: 0.9,
      },
      to: async (next) => {
        while (isBreathing) {
          await next({ opacity: 0.8, scale: 1.1 });
          await next({ opacity: 0.6, scale: 0.9 });
        }
      },
      config: {
        duration: 1000,
      },
    }),
    [isBreathing],
  );
  return (
    <div>
      <button
        onClick={() => {
          setIsBreathing((b) => !b);
        }}
      >
        toggle: {isBreathing}
      </button>
      <svg>
        <defs>
          <radialGradient id="Gradient1">
            <stop offset="0%" stopColor="#fdfeff6c" />
            <stop offset="100%" stopColor="#5ea0d6" />
          </radialGradient>
        </defs>
        <animated.circle
          cx={80}
          cy={80}
          r={50}
          fill="url(#Gradient1)"
          style={{
            transformOrigin: '80px 80px',
            ...props,
          }}
        />
      </svg>
    </div>
  );
}

export default Breath;

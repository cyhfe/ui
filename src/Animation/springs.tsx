import { css } from '@emotion/react';
import { animated, useChain, useSpringRef, useTrail } from '@react-spring/web';
import { useState } from 'react';

function Demo() {
  const [open, setOpen] = useState(false);

  const block = [
    [50, 30],
    [90, 30],
    [50, 50],
    [60, 60],
    [70, 60],
    [80, 60],
    [90, 50],
  ];

  const MAX_WIDTH = 160;
  const MAX_HEIGHT = 100;

  const xApi = useSpringRef();
  const xTrail = useTrail(11, {
    ref: xApi,
    x2: open ? MAX_WIDTH : 0,
  });

  const yApi = useSpringRef();
  const yTrail = useTrail(17, {
    ref: yApi,
    y2: open ? MAX_HEIGHT : 0,
  });

  const boxApi = useSpringRef();
  const boxTrail = useTrail(7, {
    ref: boxApi,
    scale: open ? 1 : 0,
  });

  useChain([xApi, yApi, boxApi], [0, 1, 2], 1500);

  return (
    <div>
      <button onClick={() => setOpen((b) => !b)}>toggle</button>
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          margin: auto;
        `}
      >
        <div
          css={css`
            width: 600px;
            height: 400px;
          `}
        >
          <svg viewBox="0 0 300 200">
            <rect width={300} height={200} fill="blue" />
            <g transform={`translate(${70} , ${50})`}>
              {xTrail.map(({ x2 }, i) => {
                return (
                  <animated.line
                    key={i}
                    x1={0}
                    y1={i * 10}
                    x2={x2}
                    y2={i * 10}
                    stroke="white"
                  />
                );
              })}
              {yTrail.map(({ y2 }, i) => {
                return (
                  <animated.line
                    key={i}
                    x1={i * 10}
                    y1={0}
                    x2={i * 10}
                    y2={y2}
                    stroke="white"
                  />
                );
              })}
              {boxTrail.map(({ scale }, i) => {
                return (
                  <animated.rect
                    key={i}
                    style={{
                      transformOrigin: `${5 + block[i][0]}px ${
                        5 + block[i][1]
                      }px`,
                      scale,
                    }}
                    x={block[i][0]}
                    y={block[i][1]}
                    width={10}
                    height={10}
                    fill="white"
                  />
                );
              })}
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Demo;

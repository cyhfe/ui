import { css } from '@emotion/react';
import { animated, useTrail } from '@react-spring/web';
import React, { useState } from 'react';

function Trail({
  children,
  open,
}: {
  children: React.ReactNode;
  open: boolean;
}) {
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200, duration: 1000 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 100,
    height: open ? 50 : 0,
  });
  return (
    <div>
      {trail.map((style, index) => {
        return (
          <animated.div key={index}>
            <animated.div
              css={css`
                color: black;
                font-size: 2em;
                font-weight: 800;
              `}
              style={style}
            >
              {items[index]}
            </animated.div>
          </animated.div>
        );
      })}
    </div>
  );
}

function Demo() {
  const [open, setOpen] = useState(true);
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        width: 400px;
        height: 200px;
        justify-content: center;
        margin: auto;
        outline: 1px solid steelblue;
        padding: 1rem;
      `}
      onClick={() => setOpen((b) => !b)}
    >
      <Trail open={open}>
        <span>Lorem</span>
        <span>Ipsum</span>
        <span>Dolor</span>
        <span>Sit</span>
      </Trail>
    </div>
  );
}

export default Demo;

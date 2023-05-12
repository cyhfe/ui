import { css } from '@emotion/react';
import { animated, useSpring } from '@react-spring/web';
import { useInterval } from 'rcl/useInterval';
import { useState } from 'react';

const containerStyle = css`
  width: 200px;
  height: 50px;
  border: 2px solid #37474f;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const animatedStyle = css`
  width: 100%;
  height: 100%;
  background-color: #00e676;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const mainStyle = css`
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
  overflow: hidden;
`;

const textStyle = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #37474f;
`;

export default function Demo() {
  const [open, setOpen] = useState(false);
  const styles = useSpring({ width: open ? 200 : 0 });

  useInterval(() => {
    setOpen((b) => !b);
  }, 1500);

  return (
    <div>
      <button type="button">stop</button>
      <div css={[containerStyle]}>
        <div css={mainStyle}>
          <animated.div css={animatedStyle} style={styles}></animated.div>
          <animated.div css={textStyle}>
            {styles.width.to((to) => to.toFixed(0))}
          </animated.div>
        </div>
      </div>
    </div>
  );
}

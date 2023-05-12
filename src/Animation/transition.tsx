import { css } from '@emotion/react';
import {
  AnimatedProps,
  animated,
  useSpringRef,
  useTransition,
} from '@react-spring/web';
import { useInterval } from 'rcl/useInterval';
import { ComponentPropsWithoutRef, useEffect, useState } from 'react';

interface PageProps extends AnimatedProps<ComponentPropsWithoutRef<'div'>> {
  content: string;
  index: number;
}

const pageStyle = css`
  cursor: pointer;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 800;
  font-size: 25em;
  will-change: transform, opacity;
  text-shadow: 0px 2px 40px #00000020, 0px 2px 5px #00000030;
  -webkit-user-select: none;
  user-select: none;
`;

const bgColors = ['lightpink', 'lightblue', 'lightgreen'];

function Page({ content, index, ...props }: PageProps) {
  const bg = css`
    background-color: ${bgColors[index]};
  `;
  return (
    <animated.div {...props} css={[pageStyle, bg]}>
      {content}
    </animated.div>
  );
}

const pages = [{ content: 'A' }, { content: 'B' }, { content: 'C' }];

const containerStyle = css`
  width: 400px;
  height: 400px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

function Demo() {
  const [index, setIndex] = useState(0);
  const transRef = useSpringRef();
  const [start, setStart] = useState(false);

  const transitions = useTransition(index, {
    ref: transRef,
    from: {
      opacity: 0,
      transform: 'translate3d(100%, 0, 0)',
    },
    enter: {
      opacity: 1,
      transform: 'translate3d(0%, 0, 0)',
    },
    leave: {
      opacity: 0,
      transform: 'translate3d(-50%, 0, 0)',
    },
  });

  useInterval(() => {
    start &&
      setIndex((i) => {
        return (i + 1) % 3;
      });
  }, 1000);

  useEffect(() => {
    transRef.start();
  }, [index, transRef]);

  return (
    <div>
      <button
        onClick={() => setStart((b) => !b)}
        css={css`
          margin-bottom: 2rem;
        `}
      >
        {!start ? 'AUTO PLAY' : 'STOP'}
      </button>
      <div
        css={containerStyle}
        onClick={() =>
          setIndex((i) => {
            return (i + 1) % 3;
          })
        }
      >
        {transitions((style, i) => {
          const page = pages[i];
          return <Page style={style} index={i} content={page.content} />;
        })}
      </div>
    </div>
  );
}
export default Demo;

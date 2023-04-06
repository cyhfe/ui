import React from 'react';
import { useInterval } from '.';

function Demo() {
  const [count, setCount] = React.useState(0);
  const [delay, setDelay] = React.useState(1000);
  useInterval(() => {
    setCount((c) => c + 1);
  }, delay);
  return (
    <div>
      <div>{count}</div>
      <input
        type="number"
        id="input"
        defaultValue={delay}
        onChange={(e) => {
          setDelay(Number(e.target.value));
        }}
      />
      <label htmlFor="input">ms</label>
    </div>
  );
}

export default Demo;

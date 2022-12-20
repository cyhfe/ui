import { useInterval } from '.';
import { useState } from 'react';

export default function Expample() {
  const [count, setCount] = useState(0);
  const [delay, setDelay] = useState(1000);

  useInterval(() => {
    setCount((c) => c + 1);
  }, delay);

  return (
    <div>
      <div>
        <span>delay</span>
        <input type="text" onBlur={(e) => setDelay(e.target.value)} />
      </div>
      <div>
        <span>{count}</span>
      </div>
    </div>
  );
}

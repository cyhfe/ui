import React from 'react';
import { Counter, Display, Trigger } from '.';

function Demo() {
  const [count, setCount] = React.useState(0);
  return (
    <Counter
      value={count}
      onChange={(n) => {
        console.log(n);
        setCount(n);
      }}
    >
      <Display />
      <Trigger />
    </Counter>
  );
}

export default Demo;

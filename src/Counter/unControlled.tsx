import React from 'react';
import { Counter, Display, Trigger } from '.';

function Demo() {
  return (
    <Counter defaultValue={2} onChange={(c) => console.log(c)}>
      <Display />
      <Trigger />
    </Counter>
  );
}

export default Demo;

# Counter

## controlled

<code src="./controlled.tsx"></code>

```ts | pure
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
```

## unControlled

<code src="./unControlled.tsx"></code>

```ts | pure
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
```

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import useEffectOnlyOnUpdate from './index';

function Demo() {
  const [toggle, setToggle] = useState(false);

  useEffectOnlyOnUpdate(
    (toggle) => {
      console.log(toggle);
    },
    [toggle],
  );

  return (
    <div>
      <button onClick={() => setToggle((t) => !t)}>toggle</button>
      <div>{toggle ? 'true' : 'false'}</div>
    </div>
  );
}

export default Demo;

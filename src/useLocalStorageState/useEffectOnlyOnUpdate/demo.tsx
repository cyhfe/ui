import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { useLocalStorageState } from './index';

function Demo() {
  const { storedValue, setValue } = useLocalStorageState<string>('search2', '');
  return (
    <div>
      <label>search: </label>
      <input type="text" value={storedValue} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
}

export default Demo;

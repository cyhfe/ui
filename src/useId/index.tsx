import { useLayoutEffect, useState } from 'react';

let GlobalId = 0;
function useId() {
  const [, setId] = useState<number | undefined>();
  useLayoutEffect(() => {
    setId(GlobalId++);
  }, []);
}

export { useId };

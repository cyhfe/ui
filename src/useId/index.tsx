import { useLayoutEffect, useState } from 'react';

let GlobalId = 0;
function useId() {
  const [id, setId] = useState<number | undefined>();
  useLayoutEffect(() => {
    setId(GlobalId++);
  }, []);
  return id ? `ui-${id}` : '';
}

export { useId };

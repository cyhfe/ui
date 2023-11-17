# useId

全局自增 id

## 实现

```tsx | pure
import { useLayoutEffect, useState } from 'react';

let GlobalId = 0;
function useId() {
  const [id, setId] = useState<number | undefined>();
  useLayoutEffect(() => {
    setId(GlobalId++);
  }, []);
  return String(id) ?? '';
}

export { useId };
```

# Dialog

## demo1

<code src="./demo.tsx"></code>

```ts | pure
import { css } from '@emotion/react';
import { useState } from 'react';
import { Dialog } from './index';
function Demo() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnotherOpen, setIsAnotherOpen] = useState(false);
  return (
    <div>
      <button type="button" onClick={() => setIsOpen(true)}>
        open
      </button>
      <Dialog
        isOpen={isOpen}
        onDismiss={() => {
          setIsOpen(false);
        }}
      >
        <div
          css={css`
            width: 100px;
            height: 100px;
          `}
        >
          hello dialog
        </div>
        <div>
          <button type="button" onClick={() => setIsOpen(false)}>
            close
          </button>
          <button type="button" onClick={() => setIsAnotherOpen(true)}>
            open another
          </button>
        </div>
        <Dialog
          isOpen={isAnotherOpen}
          onDismiss={() => {
            setIsAnotherOpen(false);
          }}
        >
          <div>hello dialog</div>
          <div>
            <button type="button" onClick={() => setIsAnotherOpen(false)}>
              close another
            </button>
          </div>
        </Dialog>
      </Dialog>
    </div>
  );
}

export default Demo;
```

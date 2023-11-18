import { css } from '@emotion/react';
import { useState } from 'react';
// import { Dialog } from './index';
import AnimatedDialog from './AnimatedDialog';

function Demo() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnotherOpen, setIsAnotherOpen] = useState(false);

  return (
    <div>
      <button type="button" onClick={() => setIsOpen(true)}>
        open
      </button>
      <AnimatedDialog
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
          hello AnimatedDialog
        </div>
        <div
          css={css`
            display: flex;
            justify-content: end;
            column-gap: 6px;
          `}
        >
          <button type="button" onClick={() => setIsOpen(false)}>
            close
          </button>
          <button type="button" onClick={() => setIsAnotherOpen(true)}>
            open another
          </button>
        </div>
        <AnimatedDialog
          isOpen={isAnotherOpen}
          onDismiss={() => {
            setIsAnotherOpen(false);
          }}
        >
          <div>hello AnimatedDialog</div>
          <div>
            <button type="button" onClick={() => setIsAnotherOpen(false)}>
              close another
            </button>
          </div>
        </AnimatedDialog>
      </AnimatedDialog>
    </div>
  );
}

export default Demo;

import React, { useState } from 'react';
import { Dialog } from './index';
function Demo() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button type="button" onClick={() => setIsOpen((o) => !o)}>
        toggle
      </button>
      <Dialog
        isOpen={isOpen}
        onDismiss={() => {
          setIsOpen(false);
        }}
      >
        <div>hello dialog</div>
        <div>
          <button type="button" onClick={() => setIsOpen(false)}>
            close
          </button>
        </div>
      </Dialog>
    </div>
  );
}

export default Demo;

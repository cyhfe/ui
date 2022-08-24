import { Dialog } from '.';
import React from 'react';

const Demo = () => {
  const [showDialog, setShowDialog] = React.useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  return (
    <div>
      <button onClick={open}>Open Dialog</button>

      <Dialog isOpen={showDialog} onDismiss={close}>
        <div>
          <p>Hello there. I am a dialog</p>
        </div>
        <div>
          <button onClick={close}>confirm</button>
          <button onClick={close}>cancel</button>
        </div>
      </Dialog>
    </div>
  );
};

export default Demo;

import React from 'react';
import { useEffect } from 'react';
import { noop } from '../utils';
import { Portal } from '../Portal';

import './style.less';

const Dialog = ({ isOpen, children, onDismiss = noop }) => {
  return isOpen ? (
    <Portal>
      <DialogOverlay>
        <DialogContent>{children}</DialogContent>
      </DialogOverlay>
    </Portal>
  ) : null;
};

const DialogOverlay = ({ children }) => {
  return <div className="dialog-overlay">{children}</div>;
};

const DialogContent = ({ children }) => {
  return <div className="dialog-content">{children}</div>;
};

export { Dialog };

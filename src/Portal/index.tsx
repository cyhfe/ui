import React from 'react';
import ReactDOM from 'react-dom';

type PortalRef = React.ElementRef<'div'>;

export interface PortalProps extends React.ComponentPropsWithoutRef<'div'> {
  container?: HTMLElement | null;
}

const Portal = React.forwardRef<PortalRef, PortalProps>(function Portal(
  props,
  ref,
) {
  const { container = window.document.body } = props;
  return container
    ? ReactDOM.createPortal(<div {...props} ref={ref}></div>, container)
    : null;
});

export default Portal;

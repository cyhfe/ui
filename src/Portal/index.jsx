import React from 'react';
import { useRef, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import { useForceUpdate } from '../utils';

const Portal = ({ children, type = 'portal', containerRef }) => {
  let mountNode = useRef(null);
  let portalNode = useRef(null);
  let forceUpdate = useForceUpdate();

  useLayoutEffect(() => {
    if (!mountNode.current) return;
    let ownerDocument = mountNode.current.ownerDocument;
    let body = containerRef?.current || ownerDocument.body;
    portalNode.current = ownerDocument.createElement(type);
    body.appendChild(portalNode.current);
    forceUpdate();
    return () => {
      console.log('remove');
      if (portalNode.current && body) {
        body.removeChild(portalNode.current);
      }
    };
  }, [type, forceUpdate, containerRef]);

  return portalNode.current ? (
    ReactDOM.createPortal(children, portalNode.current)
  ) : (
    <span ref={mountNode} />
  );
};

export { Portal };

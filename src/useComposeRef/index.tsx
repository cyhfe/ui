import { useCallback } from 'react';

type RefCallback = (node: HTMLElement) => void;

function assignRef(
  ref: React.MutableRefObject<any> | RefCallback,
  node: HTMLElement,
) {
  if (typeof ref === 'function') {
    ref(node);
  } else {
    ref.current = node;
  }
}

function useComposeRef(...refs: React.MutableRefObject<any>[]) {
  return useCallback((node: HTMLElement) => {
    for (let ref of refs) {
      assignRef(ref, node);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, refs);
}

export { useComposeRef };

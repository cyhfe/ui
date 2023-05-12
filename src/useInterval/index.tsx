import { useEffect } from 'react';
import { useStableCallback } from '../useStableCallback/index';

function useInterval(callback: () => void, ms: number) {
  const stableCallback = useStableCallback(callback);
  useEffect(() => {
    if (!ms && ms !== 0) return;
    let id = setInterval(stableCallback, ms);
    return () => {
      if (id) clearInterval(id);
    };
  }, [ms, stableCallback]);
}

export { useInterval };

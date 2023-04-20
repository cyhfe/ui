import { useEffect } from 'react';
import { useStableCallback } from "../useStableCallback/index";
function useInterval(callback, ms) {
  var stableCallback = useStableCallback(callback);
  useEffect(function () {
    var id = setInterval(stableCallback, ms);
    return function () {
      if (id) clearInterval(id);
    };
  }, [ms]);
}
export { useInterval };
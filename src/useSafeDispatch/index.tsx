import React from 'react';

function useSafeDispatch(dispatch: React.Dispatch<any>) {
  const isMountRef = React.useRef(false);
  React.useEffect(() => {
    isMountRef.current = true;
    return () => {
      isMountRef.current = false;
    };
  }, []);
  return React.useCallback(
    (args: any) => {
      if (isMountRef.current === true) {
        dispatch(args);
      }
    },
    [dispatch],
  );
}

export { useSafeDispatch };

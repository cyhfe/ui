# useSafeDispatch

## 问题

发送一个异步请求,拿到数据更新 state.

当请求已经发送但是还没返回时卸载组件,后续的 setState 调用找不到应用的组件,会报错.

## 解决

```tsx | pure
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
```

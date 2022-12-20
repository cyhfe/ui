import { useCallback, useLayoutEffect, useRef, useReducer } from 'react';

// 接受一个 dispatch（useReducer 返回值的第二个参数），返回新的 safeDispatch。
export default function useSafeDispatch(dispatch) {
  const mountedRef = useRef(false);

  useLayoutEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // 在组件卸载之后，不再调用 dispatch。
  const safeDispatch = useCallback(
    (...arg) => {
      mountedRef.current ? dispatch(...arg) : void 0;
    },
    [dispatch],
  );

  return safeDispatch;
}

// 使用useReducer管理状态
export function reducer(state, action) {
  switch (action.type) {
    case 'pending': {
      return {
        ...state,
        status: 'pending',
        error: null,
        data: null,
      };
    }
    case 'resolve': {
      return {
        ...state,
        data: action.payload,
        error: null,
        status: 'idle',
      };
    }
    case 'reject': {
      return {
        ...state,
        error: action.payload,
        status: 'idle',
        data: null,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type} `);
    }
  }
}

export function useAsync(initialState) {
  const [state, dispatch] = useReducer(reducer, {
    status: 'idle',
    error: null,
    data: null,
    ...initialState,
  });

  const safeDispatch = useSafeDispatch(dispatch);

  const { status, data, error } = state;

  const isIdle = status === 'idle';
  const isLoading = status === 'pending';

  const run = useCallback(
    (promise) => {
      if (!promise || !promise.then) {
        throw new Error('run need promise as params');
      }
      safeDispatch({ type: 'pending' });
      promise.then(
        (data) => safeDispatch({ type: 'resolve', payload: data }),
        (error) => safeDispatch({ type: 'reject', payload: error }),
      );
    },
    [safeDispatch],
  );

  return {
    status,
    error,
    data,

    isIdle,
    isLoading,

    run,
  };
}

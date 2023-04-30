# useRequest

请求通用逻辑: 发送请求时展示 `loading`, `error`,拿到响应后更新 state

```tsx | pure
import React from 'react';

type Status = 'pendding' | 'idle';

interface State {
  status: Status;
  data: any;
  error: any;
}

interface Action {
  type: 'pendding' | 'resolve' | 'reject';
  payload: any;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'pendding': {
      return {
        ...state,
        status: 'pendding',
        data: null,
        error: null,
      };
    }
    case 'resolve': {
      return {
        ...state,

        status: 'idle',
        data: action.payload,
        error: null,
      };
    }
    case 'reject': {
      return {
        ...state,

        status: 'idle',
        data: null,
        error: action.payload,
      };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

async function useRequest(
  initialState: State = {
    status: 'idle',
    error: null,
    data: null,
  },
) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { status, data, error } = state;

  function run(promise: Promise<any>) {
    promise.then(
      (data: any) => {
        dispatch({
          type: 'resolve',
          payload: data,
        });
      },
      (error: any) => {
        dispatch({
          type: 'reject',
          payload: error,
        });
      },
    );
  }

  const isLoading = status === 'pendding';
  const isError = status !== null;

  return {
    status,
    data,
    error,

    isLoading,
    isError,

    run,
  };
}

export { useRequest };
```

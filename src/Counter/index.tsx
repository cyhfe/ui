import React, { PropsWithChildren } from 'react';

import { createContext } from '../createContext/index';

import { useControlledState } from '../useControlledState/index';

interface ConterProviderValueType {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  onChange: (count: number) => void;
}

const [CounterProvider, useCounter] =
  createContext<ConterProviderValueType>('Counter');
interface CounterProps {
  value?: number;
  defaultValue?: number;
  onChange?: (count: number) => void;
}

function Counter(props: PropsWithChildren<CounterProps>) {
  const { value, defaultValue = 0, onChange = () => {} } = props;

  const [count, setCount] = useControlledState(value, defaultValue);

  return (
    <CounterProvider count={count} setCount={setCount} onChange={onChange}>
      {props.children}
    </CounterProvider>
  );
}

function Trigger() {
  const ctx = useCounter('Trigger');
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          ctx.setCount((c) => c + 1);
          ctx.onChange(ctx.count + 1);
        }}
      >
        +
      </button>
      <button
        type="button"
        onClick={() => {
          ctx.setCount((c) => c - 1);
          ctx.onChange(ctx.count - 1);
        }}
      >
        -
      </button>
    </div>
  );
}

function Display() {
  const ctx = useCounter('Display');
  return <div>{ctx.count}</div>;
}

export { Counter, Trigger, Display };

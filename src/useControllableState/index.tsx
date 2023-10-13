import { useStableCallback } from '../useStableCallback';
import React from 'react';

interface UseUncontrolledStateParams<T> {
  defaultProp?: T;
  onChange?: (state: T) => void;
}

// value 变化调用 onChange
function useUncontrolledState<T>({
  defaultProp,
  onChange,
}: UseUncontrolledStateParams<T>) {
  const unControlledState = React.useState(defaultProp);

  const [value] = unControlledState;
  const prevValueRef = React.useRef(value);
  const handleChange = useStableCallback(onChange);

  React.useEffect(() => {
    if (prevValueRef.current !== value) {
      handleChange(value as T);
    }
    prevValueRef.current = value;
  }, [handleChange, value]);

  return unControlledState;
}

interface UseControllableStateParams<T> {
  prop?: T;
  defaultProp?: T;
  onChange?: (state: T) => void;
}

type SetStateFn<T> = (prevState?: T) => T;

function useControllableState<T>({
  prop,
  defaultProp,
  onChange = () => {},
}: UseControllableStateParams<T>) {
  const [uncontrolledProp, setUncontrolledProp] = useUncontrolledState({
    defaultProp,
    onChange,
  });

  const isControlled = prop !== undefined;
  const value = isControlled ? prop : uncontrolledProp;
  const handleChange = useStableCallback(onChange);

  const setValue: React.Dispatch<React.SetStateAction<T | undefined>> =
    useStableCallback((nextValue) => {
      if (isControlled) {
        const setter = nextValue as SetStateFn<T>;
        const value =
          typeof nextValue === 'function' ? setter(prop) : nextValue;
        if (value !== prop) {
          handleChange(value as T);
        }
      } else {
        setUncontrolledProp(nextValue);
      }
    });

  return [value, setValue];
}

export { useControllableState, useUncontrolledState };

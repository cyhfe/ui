import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

function useLocalStorageState<T>(key: string, initialValue: T) {
  const [storedValue, setstoredValue] = useState(() => {
    let value: T;
    try {
      const item = window.localStorage.getItem(key);
      value = item ? JSON.parse(item) : '';
    } catch (error) {
      value = initialValue;
    }
    return value;
  });

  const setValue = (newValue: T) => {
    setstoredValue(newValue);
    try {
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    storedValue,
    setValue,
  };
}

export { useLocalStorageState };

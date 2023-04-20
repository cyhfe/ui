import React from 'react';
declare function useControlledState<T = any>(value: T | undefined, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>];
export { useControlledState };

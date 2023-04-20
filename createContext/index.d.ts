import React, { PropsWithChildren } from 'react';
declare type ContextProvider<T> = React.FC<PropsWithChildren<T>>;
declare function createContext<ContextValueType extends object | null>(rootComponentName: string, defaultContextValue?: ContextValueType): [
    ContextProvider<ContextValueType>,
    (callerComponentName: string) => ContextValueType
];
export { createContext };
//# sourceMappingURL=index.d.ts.map
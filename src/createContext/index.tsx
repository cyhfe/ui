import React, { PropsWithChildren } from 'react';

type ContextProvider<T> = React.FC<PropsWithChildren<T>>;

function createContext<ContextValueType extends object | null>(
  rootComponentName: string,
  defaultContextValue?: ContextValueType,
): [
  ContextProvider<ContextValueType>,
  (consumerComponentName: string) => ContextValueType,
] {
  const Ctx = React.createContext(defaultContextValue);

  function Provider(props: PropsWithChildren<ContextValueType>) {
    const { children, ...context } = props;

    const deps = Object.values(context);

    const value = React.useMemo(() => {
      return context;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps) as ContextValueType;

    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
  }

  function useContext(callerComponentName: string) {
    const context = React.useContext(Ctx);
    if (context) return context;
    if (defaultContextValue) return defaultContextValue;
    throw Error(
      `${callerComponentName} must be rendered inside of a ${rootComponentName} component.`,
    );
  }

  Ctx.displayName = `${rootComponentName}Context`;
  Provider.displayName = `${rootComponentName}Provider`;

  return [Provider, useContext];
}

export { createContext };

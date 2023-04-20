import { PropsWithChildren } from 'react';
interface CounterProps {
    value?: number;
    defaultValue?: number;
    onChange?: (count: number) => void;
}
declare function Counter(props: PropsWithChildren<CounterProps>): import("@emotion/react/jsx-runtime").JSX.Element;
declare function Trigger(): import("@emotion/react/jsx-runtime").JSX.Element;
declare function Display(): import("@emotion/react/jsx-runtime").JSX.Element;
export { Counter, Trigger, Display };

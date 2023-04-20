import React, { PropsWithChildren } from 'react';
interface TabsProps extends React.ComponentPropsWithoutRef<'div'> {
    children: React.ReactNode;
    defaultIndex?: number;
    index?: number;
    onValueChange?: (index: number) => void;
    orientation?: 'horizontal' | 'vertical';
    keyboardActivation?: 'auto' | 'manual';
}
declare const Tabs: React.ForwardRefExoticComponent<TabsProps & React.RefAttributes<HTMLDivElement>>;
interface TabListProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}
declare function TabList({ children }: TabListProps): import("@emotion/react/jsx-runtime").JSX.Element;
interface TabProps {
    children?: React.ReactNode;
    disabled?: boolean;
}
declare function Tab({ children, disabled }: TabProps): import("@emotion/react/jsx-runtime").JSX.Element;
declare function TabPanels({ children }: PropsWithChildren): import("@emotion/react/jsx-runtime").JSX.Element;
interface TabPanelProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}
declare function TabPanel({ children, ...rest }: TabPanelProps): import("@emotion/react/jsx-runtime").JSX.Element;
export { Tabs, TabList, Tab, TabPanels, TabPanel };

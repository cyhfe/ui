/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import React, { PropsWithChildren } from 'react';
import { createContext } from '../createContext';
import { useControlledState } from '../useControlledState';

import {
  createDescendantContext,
  Descendant,
  DescendantProvider,
  useDescendantsInit,
} from '../useDescendants/index';
interface TabsProps {
  children: React.ReactNode;
  defaultIndex?: number;
  index?: number;
  onChange?: (index: number) => void;
}

interface TabsContextValue {
  isControlled: boolean;
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
}

interface TabDescendant extends Descendant<HTMLElement> {
  disabled: boolean;
}

const TabsDescendantsContext = createDescendantContext<TabDescendant>(
  'TabsDescendantsContext',
);
const [TabsProvider] = createContext<TabsContextValue>('Tabs');

function Tabs({ children, defaultIndex, index }: TabsProps) {
  let { current: isControlled } = React.useRef(index !== undefined);

  let [tabs, setTabs] = useDescendantsInit<TabDescendant>();

  let [selectedIndex, setSelectedIndex] = useControlledState(
    index,
    defaultIndex ?? 0,
  );

  return (
    <DescendantProvider Ctx={TabsDescendantsContext} items={tabs} set={setTabs}>
      <TabsProvider
        isControlled={isControlled}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      >
        <div className="tabs">{children}</div>
      </TabsProvider>
    </DescendantProvider>
  );
}

function TabList({ children }: PropsWithChildren) {
  return (
    <div
      className="tab-list"
      css={css`
        display: flex;
        border: 1px solid black;
      `}
    >
      {children}
    </div>
  );
}

function Tab({ children }: PropsWithChildren) {
  return <div className="tab">{children}</div>;
}

function TabPanels({ children }: PropsWithChildren) {
  return <div className="tab-panels">{children}</div>;
}

function TabPanel({ children }: PropsWithChildren) {
  return <div>{children}</div>;
}

export { Tabs, TabList, Tab, TabPanels, TabPanel };

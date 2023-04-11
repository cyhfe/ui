/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import React, { PropsWithChildren } from 'react';
import { createContext } from '../createContext';
import { useControlledState } from '../useControlledState';

import {
  createDescendantContext,
  Descendant,
  DescendantProvider,
  useDescendant,
  useDescendantsInit,
} from '../useDescendants/index';
import { useStatefulRefValue } from '../useStatefulRefValue';
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
  onSelectTab: (index: number) => void;
}

interface TabDescendant extends Descendant<HTMLElement> {
  disabled: boolean;
}

const TabsDescendantsContext = createDescendantContext<TabDescendant>(
  'TabsDescendantsContext',
);

const TabPanelsDescendantsContext = createDescendantContext('TabPanels');

const [TabsProvider, useTabs] = createContext<TabsContextValue>('Tabs');

function Tabs({ children, defaultIndex, index, onChange }: TabsProps) {
  let { current: isControlled } = React.useRef(index !== undefined);

  let [tabs, setTabs] = useDescendantsInit<TabDescendant>();

  let [selectedIndex, setSelectedIndex] = useControlledState(
    index,
    defaultIndex ?? 0,
  );

  let onSelectTab = React.useCallback(
    (index: number) => {
      if (onChange) onChange(index);
      setSelectedIndex(index);
    },
    [onChange, setSelectedIndex],
  );

  return (
    <DescendantProvider Ctx={TabsDescendantsContext} items={tabs} set={setTabs}>
      <TabsProvider
        isControlled={isControlled}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        onSelectTab={onSelectTab}
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
      `}
    >
      {children}
    </div>
  );
}

function Tab({ children }: PropsWithChildren) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [element, handleRefSet] = useStatefulRefValue(ref, null);
  const descendant = React.useMemo(() => {
    return {
      element,
      disabled: false,
    };
  }, [element]);
  const index = useDescendant(descendant, TabsDescendantsContext);
  const { onSelectTab } = useTabs('Tab');
  return (
    <div
      className="tab"
      ref={handleRefSet}
      onClick={() => onSelectTab(index)}
      css={css`
        outline: 1px solid red;
        padding: 0.25rem 0.5rem;
        cursor: pointer;
      `}
    >
      {children}
    </div>
  );
}

function TabPanels({ children }: PropsWithChildren) {
  const [tabPanels, setTabPanels] = useDescendantsInit();

  return (
    <DescendantProvider
      Ctx={TabPanelsDescendantsContext}
      items={tabPanels}
      set={setTabPanels}
    >
      <div
        className="tab-panels"
        css={css`
          outline: 1px solid red;
        `}
      >
        {children}
      </div>
    </DescendantProvider>
  );
}

function TabPanel({ children }: PropsWithChildren) {
  const ownRef = React.useRef<HTMLDivElement | null>(null);

  const [element, handleRefSet] = useStatefulRefValue(ownRef, null);

  const descendant = React.useMemo(() => {
    return {
      element: element,
    };
  }, [element]);

  const index = useDescendant(descendant, TabPanelsDescendantsContext);
  const { selectedIndex } = useTabs('TabPanel');

  const hidden = index !== selectedIndex;

  return (
    <div ref={handleRefSet} hidden={hidden}>
      {children}
    </div>
  );
}

export { Tabs, TabList, Tab, TabPanels, TabPanel };

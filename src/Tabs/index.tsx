/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import React, { PropsWithChildren, useLayoutEffect } from 'react';
import { createContext } from '../createContext';
import { useControlledState } from '../useControlledState';

import {
  createDescendantContext,
  Descendant,
  DescendantProvider,
  useDescendant,
  useDescendants,
  useDescendantsInit,
} from '../useDescendants/index';
import { useStatefulRefValue } from '../useStatefulRefValue';

interface TabsProps {
  children: React.ReactNode;
  defaultIndex?: number;
  index?: number;
  onChange?: (index: number) => void;
  orientation?: 'horizontal' | 'vertical';
}

interface TabsContextValue {
  isControlled: boolean;
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  onSelectTab: (index: number) => void;
  orientation?: 'horizontal' | 'vertical';
}

interface TabDescendant extends Descendant<HTMLElement> {
  disabled: boolean;
}

const TabsDescendantsContext = createDescendantContext<TabDescendant>(
  'TabsDescendantsContext',
);

const TabPanelsDescendantsContext = createDescendantContext('TabPanels');

const [TabsProvider, useTabs] = createContext<TabsContextValue>('Tabs');

function Tabs({
  children,
  defaultIndex,
  index,
  onChange,
  orientation = 'horizontal',
}: TabsProps) {
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
        orientation={orientation}
      >
        <div
          className="tabs"
          css={css`
            display: ${orientation === 'vertical' ? 'flex' : null};
            p {
              margin: 0;
            }
          `}
        >
          {children}
        </div>
      </TabsProvider>
    </DescendantProvider>
  );
}

function TabList({ children }: PropsWithChildren) {
  const { selectedIndex, setSelectedIndex, isControlled, orientation } =
    useTabs('TabList');
  const tabs = useDescendants(TabsDescendantsContext);
  useLayoutEffect(() => {
    if (!isControlled && tabs[selectedIndex]?.disabled) {
      const next = tabs.findIndex((tab) => !tab.disabled);
      setSelectedIndex(next);
    }
  }, [tabs, selectedIndex]);

  return (
    <div
      className="tab-list"
      css={css`
        display: flex;
        flex-direction: ${orientation === 'vertical' ? 'column' : null};
      `}
    >
      {children}
    </div>
  );
}

interface TabProps {
  children?: React.ReactNode;
  disabled?: boolean;
}

function Tab({ children, disabled }: TabProps) {
  const ref = React.useRef<HTMLButtonElement | null>(null);
  const [element, handleRefSet] = useStatefulRefValue(ref, null);
  const { selectedIndex } = useTabs('Tab');
  const descendant = React.useMemo(() => {
    return {
      element,
      disabled: disabled ?? false,
    };
  }, [element, disabled]);
  const index = useDescendant(descendant, TabsDescendantsContext);
  const isSelected = index === selectedIndex;
  const { onSelectTab } = useTabs('Tab');
  return (
    <button
      type="button"
      className="tab"
      ref={handleRefSet}
      onClick={() => onSelectTab(index)}
      disabled={disabled}
      css={css`
        padding: 0.25rem 0.5rem;
        color: ${isSelected ? '#1890ff' : null};
        background-color: ${isSelected ? '#fff' : null};
        border: 1px solid ${isSelected ? '#1890ff' : '#d9d9d9'};
      `}
    >
      {children}
    </button>
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
          padding: 0.25rem 0.75rem;
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

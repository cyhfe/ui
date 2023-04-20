import { css } from '@emotion/react';
import React, { PropsWithChildren, useEffect, useLayoutEffect } from 'react';
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

interface TabsProps extends React.ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode;
  defaultIndex?: number;
  index?: number;
  onValueChange?: (index: number) => void;
  orientation?: 'horizontal' | 'vertical';
  keyboardActivation?: 'auto' | 'manual';
}

interface TabsContextValue {
  isControlled: boolean;
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  onSelectTab: (index: number) => void;
  orientation?: 'horizontal' | 'vertical';
  focusIndex: number;
  setFocusIndex: React.Dispatch<React.SetStateAction<number>>;
  keyboardActivation?: 'auto' | 'manual';
}

interface TabDescendant extends Descendant<HTMLElement> {
  disabled: boolean;
}

const TabsDescendantsContext = createDescendantContext<TabDescendant>(
  'TabsDescendantsContext',
);

const TabPanelsDescendantsContext = createDescendantContext('TabPanels');

const [TabsProvider, useTabs] = createContext<TabsContextValue>('Tabs');

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  {
    children,
    defaultIndex,
    index,
    onValueChange,
    orientation = 'horizontal',
    keyboardActivation = 'auto',
    ...rest
  },
  ref,
) {
  let { current: isControlled } = React.useRef(index !== undefined);

  let [tabs, setTabs] = useDescendantsInit<TabDescendant>();

  const [focusIndex, setFocusIndex] = React.useState(-1);

  let [selectedIndex, setSelectedIndex] = useControlledState(
    index,
    defaultIndex ?? 0,
  );

  let onSelectTab = React.useCallback(
    (index: number) => {
      if (onValueChange) onValueChange(index);
      setSelectedIndex(index);
    },
    [onValueChange, setSelectedIndex],
  );

  return (
    <DescendantProvider Ctx={TabsDescendantsContext} items={tabs} set={setTabs}>
      <TabsProvider
        isControlled={isControlled}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        onSelectTab={onSelectTab}
        orientation={orientation}
        focusIndex={focusIndex}
        setFocusIndex={setFocusIndex}
        keyboardActivation={keyboardActivation}
      >
        <div
          className="tabs"
          css={css`
            display: ${orientation === 'vertical' ? 'flex' : null};
            p {
              margin: 0;
            }
          `}
          ref={ref}
          {...rest}
        >
          {children}
        </div>
      </TabsProvider>
    </DescendantProvider>
  );
});

interface TabListProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function TabList({ children }: TabListProps) {
  const {
    selectedIndex,
    onSelectTab,
    isControlled,
    orientation,
    setFocusIndex,
    setSelectedIndex,
    keyboardActivation,
    focusIndex,
  } = useTabs('TabList');
  const tabs = useDescendants(TabsDescendantsContext);

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    const selectableTabs = tabs.filter((tab) => !tab.disabled);
    const index = keyboardActivation === 'auto' ? selectedIndex : focusIndex;
    if (!selectableTabs.length) return;
    let currentIndex = selectableTabs.findIndex((tab) => tab.index === index);

    switch (e.key) {
      case 'ArrowLeft': {
        if (orientation === 'horizontal') {
          const prev =
            currentIndex - 1 < 0 ? selectableTabs.length - 1 : currentIndex - 1;
          if (keyboardActivation === 'auto') {
            setFocusIndex(selectableTabs[prev].index);
            onSelectTab(selectableTabs[prev].index);
          } else {
            setFocusIndex(selectableTabs[prev].index);
          }
        }
        break;
      }
      case 'ArrowRight': {
        if (orientation === 'horizontal') {
          const next =
            currentIndex + 1 > selectableTabs.length - 1 ? 0 : currentIndex + 1;
          if (keyboardActivation === 'auto') {
            setFocusIndex(selectableTabs[next].index);
            onSelectTab(selectableTabs[next].index);
          } else {
            setFocusIndex(selectableTabs[next].index);
          }
        }
        break;
      }
      case 'ArrowUp': {
        if (orientation === 'vertical') {
          const prev =
            currentIndex - 1 < 0 ? selectableTabs.length - 1 : currentIndex - 1;
          if (keyboardActivation === 'auto') {
            setFocusIndex(selectableTabs[prev].index);
            onSelectTab(selectableTabs[prev].index);
          } else {
            setFocusIndex(selectableTabs[prev].index);
          }
        }
        break;
      }
      case 'ArrowDown': {
        if (orientation === 'vertical') {
          const next =
            currentIndex + 1 > selectableTabs.length - 1 ? 0 : currentIndex + 1;
          if (keyboardActivation === 'auto') {
            setFocusIndex(selectableTabs[next].index);
            onSelectTab(selectableTabs[next].index);
          } else {
            setFocusIndex(selectableTabs[next].index);
          }
        }
        break;
      }
      case ' ': {
        if (keyboardActivation === 'manual') {
          onSelectTab(focusIndex);
        }
        break;
      }
      case 'Enter': {
        if (keyboardActivation === 'manual') {
          onSelectTab(focusIndex);
        }
      }
    }
  };

  useLayoutEffect(() => {
    if (!isControlled && tabs[selectedIndex]?.disabled) {
      const next = tabs.findIndex((tab) => !tab.disabled);
      setSelectedIndex(next);
    }
  }, [tabs, selectedIndex]);

  return (
    <div
      className="tab-list"
      onKeyDown={handleKeyDown}
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
  const { selectedIndex, setFocusIndex, focusIndex } = useTabs('Tab');
  const descendant = React.useMemo(() => {
    return {
      element,
      disabled: disabled ?? false,
    };
  }, [element, disabled]);
  const index = useDescendant(descendant, TabsDescendantsContext);
  const isSelected = index === selectedIndex;
  const { onSelectTab } = useTabs('Tab');

  useEffect(() => {
    const isFocus = focusIndex === index;
    if (isFocus) {
      ref.current?.focus();
    }
  }, [focusIndex, index]);

  return (
    <button
      type="button"
      className="tab"
      ref={handleRefSet}
      onClick={() => onSelectTab(index)}
      onFocus={() => setFocusIndex(index)}
      onBlur={() => setFocusIndex(-1)}
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

interface TabPanelProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function TabPanel({ children, ...rest }: TabPanelProps) {
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
    <div ref={handleRefSet} hidden={hidden} {...rest}>
      {children}
    </div>
  );
}

export { Tabs, TabList, Tab, TabPanels, TabPanel };

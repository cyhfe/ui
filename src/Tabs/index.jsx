import React from 'react';
import { useState } from 'react';
import { useMemo } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
import classNames from 'classnames';

import './index.less';

const TabsContext = createContext(null);

const useTabs = () => {
  const ctx = useContext(TabsContext);
  return ctx;
};

const TabsProvider = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const value = useMemo(() => {
    return {
      activeIndex,
      setActiveIndex,
    };
  });
  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
};

const Tabs = ({ children, orientation = 'horizontal' }) => {
  const classes = classNames('tabs', orientation);
  return (
    <TabsProvider>
      <div className={classes}>{children}</div>
    </TabsProvider>
  );
};

const TabList = ({ children }) => {
  return (
    <div className="tab-list">
      {React.Children.map(children, (child, index) => {
        return React.cloneElement(child, { index });
      })}
    </div>
  );
};

const Tab = ({ children, index }) => {
  const { activeIndex, setActiveIndex } = useTabs();
  const isCurrent = activeIndex === index;
  const classes = classNames('tab', isCurrent ? 'active' : '');
  return (
    <div
      className={classes}
      onClick={() => {
        setActiveIndex(index);
      }}
    >
      {children}
    </div>
  );
};

const TabPanels = ({ children }) => {
  const { activeIndex } = useTabs();
  return (
    <div className="tab-panels">
      {React.Children.map(children, (child, index) => {
        if (activeIndex !== index) return null;
        return React.cloneElement(child, { index });
      })}
    </div>
  );
};

const TabPanel = ({ children }) => {
  return <div className="tab-panel">{children}</div>;
};

export { Tabs, TabList, TabPanels, TabPanel, Tab };

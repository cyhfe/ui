import React from 'react';
import { useMemo } from 'react';
import { useState } from 'react';

const AccordionContext = React.createContext(null);

const useAccordion = () => {
  const ctx = React.useContext(AccordionContext);
  return ctx;
};

const Accordion = ({ children, multiple = false, collapsible = false }) => {
  const [openPanels, setOpenPanels] = useState(multiple ? [0] : 0);

  const value = {
    openPanels,
    setOpenPanels,
    multiple,
    collapsible,
  };

  return (
    <AccordionContext.Provider value={value}>
      <div className="accordion">
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(child, { index });
        })}
      </div>
    </AccordionContext.Provider>
  );
};

const AccordionItemContext = React.createContext(null);

const useAccordionItem = () => {
  const ctx = React.useContext(AccordionItemContext);
  return ctx;
};

const AccordionItem = ({ children, index }) => {
  const value = useMemo(() => {
    return {
      index,
    };
  });
  return (
    <AccordionItemContext.Provider value={value}>
      <div className="accordion">{children}</div>
    </AccordionItemContext.Provider>
  );
};

const AccordionButton = ({ children }) => {
  const { openPanels, setOpenPanels, collapsible, multiple } = useAccordion();
  const { index } = useAccordionItem();

  const handleClick = () => {
    if (multiple) {
      if (!collapsible && openPanels.length === 1 && openPanels[0] === index) return;
      const nextOpenPanels = openPanels.includes(index)
        ? openPanels.filter((panelIndex) => panelIndex !== index)
        : openPanels.concat(index);
      setOpenPanels(nextOpenPanels);
    } else {
      if (collapsible && index === openPanels) {
        setOpenPanels(null);
      } else {
        setOpenPanels(index);
      }
    }
  };

  return (
    <button className="accordion" onClick={() => handleClick()}>
      {children}
    </button>
  );
};

const AccordionPanel = ({ children }) => {
  const { openPanels, setOpenPanels, multiple } = useAccordion();
  const { index } = useAccordionItem();

  const isOpen = multiple ? openPanels.includes(index) : openPanels === index;

  if (!isOpen) return null;

  return <div className="accordion">{children}</div>;
};

export { Accordion, AccordionItem, AccordionButton, AccordionPanel };

// Accordion
// AccordionItem
// AccordionButton
// AccordionPanel
// useAccordionContext
// useAccordionItemContext

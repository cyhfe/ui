import React from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from './index';

const DataTabs = ({ data }) => {
  return (
    <Tabs>
      <TabList>
        {data.map(({ label, index }) => (
          <Tab key={index}>{label}</Tab>
        ))}
      </TabList>
      <TabPanels>
        {data.map(({ content, index }) => (
          <TabPanel key={index}>{content}</TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

function Example() {
  const tabData = [
    { label: 'Taco', content: 'Perhaps the greatest dish ever invented.' },
    {
      label: 'Burrito',
      content: 'Perhaps the greatest dish ever invented but bigger and with rice.',
    },
  ];

  return <DataTabs data={tabData} />;
}

export default Example;

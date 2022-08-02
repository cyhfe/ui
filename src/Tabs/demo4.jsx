import React from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from './index';

const DataTabs = ({ data }) => {
  return (
    <Tabs>
      <TabList>
        {data.map(({ label, id }) => (
          <Tab key={id}>{label}</Tab>
        ))}
      </TabList>
      <TabPanels>
        {data.map(({ content, id }) => (
          <TabPanel key={id}>{content}</TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

function Example() {
  const tabData = [
    { id: 1, label: 'Taco', content: 'Perhaps the greatest dish ever invented.' },
    {
      id: 2,
      label: 'Burrito',
      content: 'Perhaps the greatest dish ever invented but bigger and with rice.',
    },
  ];

  return <DataTabs data={tabData} />;
}

export default Example;

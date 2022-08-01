import React from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from './index';

function Example() {
  return (
    <Tabs>
      <div>random text</div>
      <TabPanels>
        <TabPanel>
          <p>one!</p>
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
        <TabPanel>
          <p>three!</p>
        </TabPanel>
      </TabPanels>
      <TabList>
        <Tab>One</Tab>
        <Tab>Two</Tab>
        <Tab>Three</Tab>
      </TabList>
    </Tabs>
  );
}

export default Example;

/** @jsxImportSource @emotion/react */

import React from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '.';
function Demo() {
  const [tabIndex, setTabIndex] = React.useState(0);
  return (
    <div>
      <p>Control the tabs with this slider:</p>

      <p>
        <input
          type="range"
          min="0"
          max="2"
          value={tabIndex}
          onChange={(event) => {
            setTabIndex(parseInt(event.target.value, 10));
          }}
        />{' '}
        {tabIndex}
      </p>
      <Tabs
        index={tabIndex}
        onChange={(index) => {
          // console.log(index);
          setTabIndex(index);
        }}
      >
        <TabList>
          <Tab>One</Tab>
          <Tab>Two</Tab>
          <Tab>Three</Tab>
        </TabList>
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
      </Tabs>
    </div>
  );
}

export default Demo;

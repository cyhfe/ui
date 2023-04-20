import { css } from '@emotion/react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '.';

const tabsStyle = css({
  width: 400,
  boxShadow: '1px 1px 5px hsla(0, 0%, 0%, 0.25)',
});

const tabListWrapperStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  border: '1px solid darkslategray',
  padding: '4px 0',
});

function Demo() {
  return (
    <Tabs css={tabsStyle}>
      <div css={tabListWrapperStyle}>
        <TabList style={{ margin: '0 16px' }}>
          <Tab>One</Tab>
          <Tab>Two</Tab>
          <Tab>Three</Tab>
        </TabList>
        <div css={css({ margin: '0 16px', textAlign: 'right' })}>
          Here is content styled alongside the tab list
        </div>
      </div>

      <div style={{ background: 'ghostwhite', padding: '16px' }}>
        <div style={{ textAlign: 'center' }}>
          Here is content above tab panels but styled with it.
        </div>
        <TabPanels>
          <TabPanel>
            <h1>one!</h1>
            <button type="button">yo</button>
          </TabPanel>
          <TabPanel>
            <h1>two!</h1>
          </TabPanel>
          <TabPanel>
            <h1>three!</h1>
          </TabPanel>
        </TabPanels>
      </div>
    </Tabs>
  );
}

export default Demo;

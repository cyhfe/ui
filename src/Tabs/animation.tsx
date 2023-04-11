/** @jsxImportSource @emotion/react */

import { css, keyframes } from '@emotion/react';
import React, { PropsWithChildren } from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from './';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

function FadeInTabPanel({ children }: PropsWithChildren) {
  return (
    <TabPanel
      css={css`
        animation: ${fadeIn} 1.5s linear;
      `}
    >
      {children}
    </TabPanel>
  );
}

function Demo() {
  return (
    <Tabs>
      <TabList>
        <Tab>One</Tab>
        <Tab>Two</Tab>
        <Tab>Three</Tab>
      </TabList>
      <TabPanels>
        <FadeInTabPanel>
          <p>one!</p>
        </FadeInTabPanel>
        <FadeInTabPanel>
          <p>two!</p>
        </FadeInTabPanel>
        <FadeInTabPanel>
          <p>three!</p>
        </FadeInTabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default Demo;

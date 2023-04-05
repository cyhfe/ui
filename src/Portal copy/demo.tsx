/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import React from 'react';
import Portal from './index';

const style = css`
  color: red;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

function Demo() {
  return <Portal css={style}>portal</Portal>;
}

export default Demo;

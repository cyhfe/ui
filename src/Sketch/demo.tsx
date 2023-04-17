/** @jsxImportSource @emotion/react */

import React from 'react';
import { Canvas, CanvasRoot, ToolBar } from '.';

function Demo() {
  return (
    <div>
      <CanvasRoot>
        <ToolBar />
        <Canvas />
      </CanvasRoot>
    </div>
  );
}

export default Demo;

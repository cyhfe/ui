import React from 'react';
import { Tooltip } from '.';
function Example() {
  return (
    <div>
      <Tooltip label="Notifications">
        <button type="button" style={{ fontSize: 25 }}>
          <span>🔔</span>
        </button>
      </Tooltip>
      <Tooltip label="Settings">
        <button type="button" style={{ fontSize: 25 }}>
          <span>⚙️</span>
        </button>
      </Tooltip>
      <Tooltip label="Your files are safe with us">
        <button type="button" style={{ fontSize: 25 }}>
          <span>💾</span> Save
        </button>
      </Tooltip>

      <div style={{ float: 'right' }}>
        <Tooltip label="Notifications">
          <button type="button" style={{ fontSize: 25 }}>
            <span>🔔</span>
            <span>3</span>
          </button>
        </Tooltip>
      </div>
    </div>
  );
}

export default Example;

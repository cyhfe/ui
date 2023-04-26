import { useEffect, useState } from 'react';

import { machine, Tooltip } from '.';
function Example() {
  // 1
  const [state, setState] = useState(machine.state);

  useEffect(() => {
    return machine.subscribe(() => {
      setState(machine.state);
    });
  }, [machine]);

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>machine state: {state}</div>
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
    </div>
  );
}

export default Example;

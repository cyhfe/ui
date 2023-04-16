/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import React from 'react';
import { ToastRoot, useToast, type Position } from './index';
function Node() {
  return <div>node</div>;
}

function Example() {
  const { enqueueToast } = useToast('Example');
  return (
    <div
      className="Example"
      css={css`
        display: flex;
        gap: 12px;
      `}
    >
      <button
        type="button"
        onClick={() =>
          enqueueToast({
            type: 'info',
            message: 'info message',
          })
        }
      >
        Add info toast
      </button>
      <button
        type="button"
        onClick={() =>
          enqueueToast({
            type: 'error',
            message: 'error message',
          })
        }
      >
        Add error toast
      </button>
      <button
        type="button"
        onClick={() =>
          enqueueToast({
            type: 'success',
            message: 'success message',
          })
        }
      >
        Add success toast
      </button>
      <button
        type="button"
        onClick={() =>
          enqueueToast({
            type: 'info',
            node: <Node />,
          })
        }
      >
        Add info toast
      </button>
    </div>
  );
}

function App() {
  const [autoClose, setAutoClose] = React.useState(false);
  const [max, setMax] = React.useState<string | undefined>(undefined);
  const [duration, setDuration] = React.useState(3000);
  const [position, setPosition] = React.useState<Position>('top-right');

  return (
    <ToastRoot
      position={position}
      autoClose={autoClose}
      duration={duration}
      max={max === undefined ? max : Number(max)}
    >
      <div
        css={css`
          display: flex;
          gap: 18px;
          margin-bottom: 20px;
        `}
      >
        <div>
          <label htmlFor="autoClose">autoClose: </label>
          <input
            type="checkbox"
            onChange={(e) => setAutoClose(e.target.checked)}
            id="autoClose"
          />
        </div>
        <div>
          <label htmlFor="duration">duration: </label>
          <input
            type="number"
            defaultValue={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            id="duration"
          />
        </div>
        <div>
          <label htmlFor="position">position: </label>
          <select
            name="position"
            id="position"
            value={position}
            onChange={(e) => setPosition(e.target.value as Position)}
          >
            <option value="top-left">TOP-LEFT</option>
            <option value="top-center">TOP-CENTER</option>
            <option value="top-right">TOP-RIGHT</option>
            <option value="bottom-left">BOTTOM-LEFT</option>
            <option value="bottom-center">BOTTOM-CENTER</option>
            <option value="bottom-right">BOTTOM-RIGHT</option>
          </select>
        </div>
        <div>
          <label htmlFor="max">max: </label>
          <input type="number" onChange={(e) => setMax(e.target.value)} />
        </div>
      </div>
      <Example />
    </ToastRoot>
  );
}

export default App;

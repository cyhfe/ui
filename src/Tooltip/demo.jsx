import { Tooltip } from '.';

function Example() {
  return (
    <div>
      <Tooltip label="Notifications">
        <button style={{ fontSize: 25 }}>
          <span>🔔</span>
        </button>
      </Tooltip>
      <Tooltip label="Settings">
        <button style={{ fontSize: 25 }}>
          <span aria-hidden>⚙️</span>
        </button>
      </Tooltip>

      <div style={{ float: 'right' }}>
        <Tooltip label="Notifications">
          <button style={{ fontSize: 25 }}>
            <span>🔔</span>
            <span>3</span>
          </button>
        </Tooltip>
      </div>
    </div>
  );
}

export default Example;

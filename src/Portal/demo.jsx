import { Portal } from './index';

const Example = () => {
  return (
    <div>
      normal
      <Portal>
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
          }}
        >
          portal
        </div>
      </Portal>
    </div>
  );
};

export default Example;

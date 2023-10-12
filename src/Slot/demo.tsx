import { ComponentPropsWithoutRef } from 'react';
import { Slot } from './index';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  asChild?: boolean;
}

function Button({ asChild, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  return <Comp {...props} />;
}

function Demo() {
  return (
    <div>
      <Button>without asChild</Button>
      <Button
        asChild
        onClick={() => console.log('parent')}
        style={{ color: 'red' }}
      >
        <a onClick={() => console.log('child')} style={{ color: 'blue' }}>
          with asChild
        </a>
      </Button>
    </div>
  );
}

export default Demo;

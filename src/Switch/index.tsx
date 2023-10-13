import React from 'react';

interface SwitchProps extends React.ComponentPropsWithoutRef<'button'> {
  defaultChecked?: boolean;
  checked?: boolean;
  onCheckedChange?(checked: boolean): void;
}

type SwitchElement = React.ElementRef<'button'>;

const Root = React.forwardRef<SwitchElement, SwitchProps>((props, ref) => {
  return <button {...props} ref={ref} />;
});

const Thumb = () => {
  return <div>thumb</div>;
};

export { Root, Thumb };

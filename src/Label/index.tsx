import React, { ComponentPropsWithoutRef, forwardRef } from 'react';

type LabelElement = HTMLLabelElement;

interface LabelProps extends ComponentPropsWithoutRef<'label'> {
  children?: React.ReactNode;
}

const Label = forwardRef<LabelElement, LabelProps>(function Label(
  props,
  forwardRef,
) {
  return <label {...props} ref={forwardRef} />;
});

const Root = Label;

export { Label, Root };

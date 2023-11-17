import { useId } from '../useId';
import { useComposeRefs } from '../useComposeRefs';
import React, { ComponentPropsWithoutRef, ReactNode, forwardRef } from 'react';
import { createContext } from '../createContext';

// Form
type FormELment = HTMLFormElement;
interface FormProps {
  children: ReactNode;
}

const Form = forwardRef<FormELment, FormProps>(function Form(
  formProps,
  forwardRef,
) {
  const formRef = React.useRef<HTMLFormElement | null>(null);
  const composedFormRef = useComposeRefs(forwardRef, formRef);
  return <form {...formProps} ref={composedFormRef} />;
});

// Field
interface FieldContextValue {
  id: string;
  name: string;
}

const [FieldProvider, useField] = createContext<FieldContextValue>('Field');
interface FieldProps extends ComponentPropsWithoutRef<'div'> {
  name: string;
}

const Field = forwardRef<HTMLDivElement, FieldProps>(function Field(
  props,
  forwardRef,
) {
  const id = useId();
  const { name, ...rest } = props;
  return (
    <FieldProvider id={id} name={name}>
      <div {...rest} ref={forwardRef}></div>;
    </FieldProvider>
  );
});

function Label() {}

function Control() {}

function Message() {}

function ValidityState() {}

function Submit() {}

const Root = Form;

export {
  Root,
  Field,
  Label,
  Control,
  Message,
  ValidityState,
  Submit,
  useField,
};

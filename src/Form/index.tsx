import { useId } from '../useId';
import { useComposeRefs } from '../useComposeRefs';
import React, { ComponentPropsWithoutRef, ReactNode, forwardRef } from 'react';
import { createContext } from '../createContext';
import { Label as LabelBase } from '../Label';

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
      <div {...rest} ref={forwardRef} />
    </FieldProvider>
  );
});

const Label = forwardRef<HTMLLabelElement, ComponentPropsWithoutRef<'label'>>(
  function Label(props, forwardRef) {
    const { id } = useField('Label');
    const htmlFor = props.htmlFor || id;
    return <LabelBase {...props} htmlFor={htmlFor} ref={forwardRef} />;
  },
);

const Control = forwardRef<HTMLInputElement, ComponentPropsWithoutRef<'input'>>(
  function Control(props, forwardRef) {
    const { id, name } = useField('Control');
    return <input {...props} id={id} name={name} ref={forwardRef} />;
  },
);

// Message
const validityMatchers = [
  'badInput',
  'patternMismatch',
  'rangeOverflow',
  'rangeUnderflow',
  'stepMismatch',
  'tooLong',
  'tooShort',
  'typeMismatch',
  'valid',
  'valueMissing',
] as const;

type ValidityMatcher = (typeof validityMatchers)[number];

const DEFAULT_INVALID_MESSAGE = 'This value is not valid';

const DEFAULT_BUILT_IN_MESSAGES: Record<ValidityMatcher, string | undefined> = {
  badInput: DEFAULT_INVALID_MESSAGE,
  patternMismatch: 'This value does not match the required pattern',
  rangeOverflow: 'This value is too large',
  rangeUnderflow: 'This value is too small',
  stepMismatch: 'This value does not match the required step',
  tooLong: 'This value is too long',
  tooShort: 'This value is too short',
  typeMismatch: 'This value does not match the required type',
  valid: undefined,
  valueMissing: 'This value is missing',
};

type MessageImplElement = HTMLSpanElement;

const MessageImpl = forwardRef<
  HTMLSpanElement,
  ComponentPropsWithoutRef<'span'>
>(function Message(props, forwardRef) {
  return <span {...props} ref={forwardRef} />;
});

const FormBuildInMessagge = forwardRef<
  MessageImplElement,
  ComponentPropsWithoutRef<'span'>
>(function FormBuildInMessagge(props, forwardRef) {
  const matches = false;
  if (matches) return <MessageImpl {...props} ref={forwardRef} />;
  return null;
});

interface MessageProps extends ComponentPropsWithoutRef<'span'> {
  match?: ValidityMatcher;
}

const Message = forwardRef<MessageImplElement, MessageProps>(function Message(
  props,
  forwardRef,
) {
  const { match, ...rest } = props;
  if (match === undefined)
    return (
      <MessageImpl {...rest} ref={forwardRef}>
        {props.children || DEFAULT_INVALID_MESSAGE}
      </MessageImpl>
    );
  return <FormBuildInMessagge {...rest} ref={forwardRef} />;
});

// const FormCustomMessage = forwardRef(function FormCustomMessage(
//   props,
//   forwardRef,
// ) {
//   return null;
// });

function ValidityState() {}

// Submit
const Submit = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<'button'>
>(function Submit(props, forwardRef) {
  return <button type="submit" {...props} ref={forwardRef} />;
});

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

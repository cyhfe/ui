import { useComposeRefs } from '../useComposeRefs';
import React, { ReactNode, forwardRef } from 'react';

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

function Field() {
  return <div></div>;
}

function Label() {}

function Control() {}

function Message() {}

function ValidityState() {}

function Submit() {}

const Root = Form;

export { Root, Field, Label, Control, Message, ValidityState, Submit };

import React, { ComponentPropsWithoutRef } from 'react';
import { callAll } from '../callAll';
interface FormProps extends ComponentPropsWithoutRef<'form'> {
  onInvalid?: (e: React.FormEvent<HTMLFormElement>) => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  onReset?: (e: React.FormEvent<HTMLFormElement>) => void;
  onClearServerErrors?: () => void;
  children: React.ReactNode;
}

function isHTMLElement(el: any): el is HTMLElement {
  return el instanceof HTMLElement;
}

function isFormControl(element: any): element is { validity: ValidityState } {
  return 'validity' in element;
}

function isInvalid(control: HTMLElement) {
  return (
    isFormControl(control) &&
    (control.validity.valid === false ||
      control.getAttribute('aria-invalid') === 'true')
  );
}

function getFirstInvalidControl(
  form: HTMLFormElement,
): HTMLElement | undefined {
  const elements = form.elements;
  const [firstInvalidControl] = Array.from(elements)
    .filter(isHTMLElement)
    .filter(isInvalid);
  return firstInvalidControl;
}

function Form({
  children,
  onInvalid,
  onSubmit,
  onReset,
  onClearServerErrors,
  ...rest
}: FormProps) {
  return (
    <form
      onInvalid={callAll(onInvalid, (e: React.FormEvent<HTMLFormElement>) => {
        const firstInvalidControl = getFirstInvalidControl(e.currentTarget);
        if (firstInvalidControl === e.target) firstInvalidControl.focus();
        e.preventDefault();
      })}
      onSubmit={callAll(onSubmit, onClearServerErrors)}
      onReset={callAll(onReset, onClearServerErrors)}
      {...rest}
    >
      {children}
    </form>
  );
}

const Root = Form;

export { Root };

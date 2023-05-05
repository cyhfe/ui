import { ComponentPropsWithoutRef } from 'react';
import { callAll } from '../callAll';
interface FormProps extends ComponentPropsWithoutRef<'form'> {
  onInvalid?: (e: React.FormEvent<HTMLFormElement>) => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  onReset?: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

function Form({ children, onInvalid, onSubmit, onReset, ...rest }: FormProps) {
  return (
    <form
      onInvalid={callAll(onInvalid)}
      onSubmit={callAll(onSubmit)}
      onReset={callAll(onReset)}
      {...rest}
    >
      {children}
    </form>
  );
}

const Root = Form;

export { Root };

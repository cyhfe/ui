import { useId } from '../useId';
import { useComposeRefs } from '../useComposeRefs';
import React, {
  ComponentPropsWithoutRef,
  ReactNode,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { createContext } from '../createContext';
import { Label as LabelBase } from '../Label';

// Form

// Validation

type ValidityMap = { [fieldName: string]: ValidityState | undefined };

interface ValidationContextValue {
  handleFieldValidityChange: (name: string, state: ValidityState) => void;
  handleFieldValidityClear: (name: string) => void;
  getFieldValidity: (name: string) => ValidityState | undefined;
}

const [ValidationProvider, useValidation] =
  createContext<ValidationContextValue>('Form');
interface FormProps extends ComponentPropsWithoutRef<'form'> {
  children?: ReactNode;
}

type FormELment = HTMLFormElement;
const Form = forwardRef<FormELment, FormProps>(function Form(
  formProps,
  forwardRef,
) {
  const formRef = React.useRef<HTMLFormElement | null>(null);
  const composedFormRef = useComposeRefs(forwardRef, formRef);

  // validation
  const [validityMap, setValidityMap] = React.useState<ValidityMap>({});

  const handleFieldValidityChange = useCallback(
    (name: string, state: ValidityState) => {
      setValidityMap((prev) => ({ ...prev, [name]: state }));
    },
    [],
  );

  const handleFieldValidityClear = useCallback((name: string) => {
    setValidityMap((prev) => ({ ...prev, [name]: undefined }));
  }, []);

  const getFieldValidity = useCallback(
    (name: string) => validityMap[name],
    [validityMap],
  );

  return (
    <ValidationProvider
      handleFieldValidityChange={handleFieldValidityChange}
      handleFieldValidityClear={handleFieldValidityClear}
      getFieldValidity={getFieldValidity}
    >
      <form {...formProps} ref={composedFormRef} />;
    </ValidationProvider>
  );
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
    const inputRef = useRef<HTMLInputElement | null>(null);
    const composedRef = useComposeRefs(forwardRef, inputRef);
    const { handleFieldValidityChange } = useValidation('Control');

    const updateControlValidity = useCallback(
      (control: HTMLInputElement) => {
        if (hasBuiltInError(control.validity)) {
          const controlValidity = validityStateToObject(control.validity);
          handleFieldValidityChange(name, controlValidity);
          return;
        }
      },
      [name, handleFieldValidityChange],
    );

    useEffect(() => {
      const input = inputRef.current;
      if (input) {
        const handleChange = () => {
          updateControlValidity(input);
        };
        input.addEventListener('change', handleChange);
        return () => input.removeEventListener('change', handleChange);
      }
    }, [updateControlValidity, name]);

    return (
      <input
        {...props}
        id={id}
        name={name}
        ref={composedRef}
        // onChange={() => console.log('react change')}
      />
    );
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
type SyncCustomMatcher = (value: string, formData: FormData) => boolean;
type AsyncCustomMatcher = (
  value: string,
  formData: FormData,
) => Promise<boolean>;
type CustomMatcher = SyncCustomMatcher | AsyncCustomMatcher;

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

interface FormBuildInMessaggeProps extends ComponentPropsWithoutRef<'span'> {
  match: ValidityMatcher;
}

const FormBuildInMessagge = forwardRef<
  MessageImplElement,
  FormBuildInMessaggeProps
>(function FormBuildInMessagge(props, forwardRef) {
  const { children, match, ...rest } = props;
  const { name } = useField('FormBuildInMessagge');
  const { getFieldValidity } = useValidation('FormBuildInMessagge');
  const matches = getFieldValidity(name)?.[match];
  if (matches)
    return (
      <MessageImpl {...rest} ref={forwardRef}>
        {children || DEFAULT_BUILT_IN_MESSAGES[match]}
      </MessageImpl>
    );
  return null;
});

interface MessageProps extends ComponentPropsWithoutRef<'span'> {
  match?: ValidityMatcher | ((value: any) => boolean);
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
  return <FormBuildInMessagge {...rest} match={match} ref={forwardRef} />;
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

type ValidityStateKey = keyof ValidityState;
function hasBuiltInError(validity: ValidityState) {
  let error = false;
  for (const validityKey in validity) {
    const key = validityKey as ValidityStateKey;
    if (key !== 'valid' && key !== 'customError' && validity[key]) {
      error = true;
      break;
    }
  }
  return error;
}

function validityStateToObject(validity: ValidityState) {
  const object: any = {};
  for (const key in validity) {
    object[key] = validity[key as ValidityStateKey];
  }
  return object as Record<ValidityStateKey, boolean>;
}

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

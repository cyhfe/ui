import { useId } from '../useId';
import { useComposeRefs } from '../useComposeRefs';
import React, {
  ComponentPropsWithoutRef,
  ReactNode,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createContext } from '../createContext';
import { Label as LabelBase } from '../Label';

// Form

// Validation

type ValidityMap = { [fieldName: string]: ValidityState | undefined };
type CustomMatcherEntriesMap = { [fieldName: string]: CustomMatcherEntry[] };
type CustomErrorsMap = { [fieldName: string]: Record<string, boolean> };

type ValidityStateKey = keyof ValidityState;
type SyncCustomMatcher = (value: string, formData: FormData) => boolean;
type AsyncCustomMatcher = (
  value: string,
  formData: FormData,
) => Promise<boolean>;
type CustomMatcher = SyncCustomMatcher | AsyncCustomMatcher;
type CustomMatcherEntry = { id: string; match: CustomMatcher };
type SyncCustomMatcherEntry = { id: string; match: SyncCustomMatcher };
type AsyncCustomMatcherEntry = { id: string; match: AsyncCustomMatcher };
type CustomMatcherArgs = [string, FormData];

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

interface ValidationContextValue {
  // built-in
  handleFieldValidityChange: (name: string, state: ValidityState) => void;
  handleFieldValidityClear: (name: string) => void;
  getFieldValidity: (name: string) => ValidityState | undefined;

  // custom
  getFieldCustomMatcherEntries(fieldName: string): CustomMatcherEntry[];
  handleFieldCustomMatcherEntryAdd(
    fieldName: string,
    matcherEntry: CustomMatcherEntry,
  ): void;
  handleFieldCustomMatcherEntryRemove(
    fieldName: string,
    matcherEntryId: string,
  ): void;

  getFieldCustomErrors(fieldName: string): Record<string, boolean>;
  handleFieldCustomErrorsChange(
    fieldName: string,
    errors: Record<string, boolean>,
  ): void;
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

  const [customMatcherEntriesMap, setCustomMatcherEntriesMap] =
    useState<CustomMatcherEntriesMap>({});

  const handleFieldCustomMatcherEntryAdd = useCallback(
    (fieldName: string, matcherEntry: CustomMatcherEntry) => {
      setCustomMatcherEntriesMap((prev) => {
        return {
          ...prev,
          [fieldName]: [...(prev[fieldName] ?? []), matcherEntry],
        };
      });
    },
    [],
  );

  const handleFieldCustomMatcherEntryRemove = useCallback(
    (fieldName: string, matcherEntryId: string) => {
      setCustomMatcherEntriesMap((prev) => {
        return {
          ...prev,
          [fieldName]: (prev[fieldName] ?? []).filter(
            (entry) => entry.id !== matcherEntryId,
          ),
        };
      });
    },
    [],
  );

  const getFieldCustomMatcherEntries = useCallback(
    (filedName: string) => {
      return customMatcherEntriesMap[filedName];
    },
    [customMatcherEntriesMap],
  );

  const [customErrors, setCustomErrors] = useState<CustomErrorsMap>({});

  const handleFieldCustomErrorsChange: ValidationContextValue['handleFieldCustomErrorsChange'] =
    useCallback((fieldName, customErrors) => {
      setCustomErrors((prev) => ({
        ...prev,
        [fieldName]: {
          ...(prev[fieldName] ?? {}),
          ...customErrors,
        },
      }));
    }, []);

  const getFieldCustomErrors = useCallback(
    (fieldName: string) => {
      return customErrors[fieldName];
    },
    [customErrors],
  );

  return (
    <ValidationProvider
      handleFieldValidityChange={handleFieldValidityChange}
      handleFieldValidityClear={handleFieldValidityClear}
      getFieldValidity={getFieldValidity}
      handleFieldCustomMatcherEntryAdd={handleFieldCustomMatcherEntryAdd}
      handleFieldCustomMatcherEntryRemove={handleFieldCustomMatcherEntryRemove}
      getFieldCustomMatcherEntries={getFieldCustomMatcherEntries}
      handleFieldCustomErrorsChange={handleFieldCustomErrorsChange}
      getFieldCustomErrors={getFieldCustomErrors}
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
    const { getFieldCustomMatcherEntries, handleFieldCustomErrorsChange } =
      useValidation('Control');
    const customMatcherEntries = getFieldCustomMatcherEntries(name);

    const updateControlValidity = useCallback(
      (control: HTMLInputElement) => {
        // build in error
        if (hasBuiltInError(control.validity)) {
          const controlValidity = validityStateToObject(control.validity);
          handleFieldValidityChange(name, controlValidity);
          return;
        }

        // custom error
        const formData = control.form
          ? new FormData(control.form)
          : new FormData();
        const matcherArgs: CustomMatcherArgs = [control.value, formData];

        const syncCustomMatcherEntries: Array<SyncCustomMatcherEntry> = [];
        const ayncCustomMatcherEntries: Array<AsyncCustomMatcherEntry> = [];

        customMatcherEntries.forEach((customMatcherEntry) => {
          if (isAsyncCustomMatcherEntry(customMatcherEntry, matcherArgs)) {
            ayncCustomMatcherEntries.push(customMatcherEntry);
          } else if (isSyncCustomMatcherEntry(customMatcherEntry)) {
            syncCustomMatcherEntries.push(customMatcherEntry);
          }
        });

        const syncCustomErrors = syncCustomMatcherEntries.map(
          ({ id, match }) => {
            return [id, match(...matcherArgs)] as const;
          },
        );
        const syncCustomErrorsById = Object.fromEntries(syncCustomErrors);
        const hasSyncCustomErrors =
          Object.values(syncCustomErrorsById).some(Boolean);
        const hasCustomError = hasSyncCustomErrors;
        control.setCustomValidity(
          hasCustomError ? DEFAULT_INVALID_MESSAGE : '',
        );
        const controlValidity = validityStateToObject(control.validity);
        handleFieldValidityChange(name, controlValidity);
        handleFieldCustomErrorsChange(name, syncCustomErrorsById);
      },
      [customMatcherEntries, handleFieldValidityChange, name],
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

interface CustomMessageProps extends ComponentPropsWithoutRef<'span'> {
  match: CustomMatcher;
}

const FormCustomMessage = forwardRef<MessageImplElement, CustomMessageProps>(
  function FormCustomMessage(props, forwardRef) {
    const { match, children, ...rest } = props;
    const customMessageId = useId();
    const { name } = useField('FormCustomMessage');
    const {
      handleFieldCustomMatcherEntryAdd,
      handleFieldCustomMatcherEntryRemove,
    } = useValidation('FormCustomMessage');

    const { getFieldCustomErrors } = useValidation('FormCustomMessage');
    const customErrors = getFieldCustomErrors(name);

    console.log(customErrors);

    const matches = customMessageId ?? customErrors[customMessageId];

    useEffect(() => {
      handleFieldCustomMatcherEntryAdd(name, { id: customMessageId, match });
      return () => {
        handleFieldCustomMatcherEntryRemove(name, customMessageId);
      };
    }, [
      customMessageId,
      handleFieldCustomMatcherEntryAdd,
      handleFieldCustomMatcherEntryRemove,
      match,
      name,
    ]);

    if (matches) {
      return (
        <MessageImpl {...rest} ref={forwardRef}>
          {children || DEFAULT_INVALID_MESSAGE}
        </MessageImpl>
      );
    }

    return null;
  },
);

interface MessageProps extends ComponentPropsWithoutRef<'span'> {
  match?: ValidityMatcher | CustomMatcher;
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
  else if (typeof match === 'function') {
    return <FormCustomMessage {...rest} match={match} ref={forwardRef} />;
  }
  return <FormBuildInMessagge {...rest} match={match} ref={forwardRef} />;
});

function ValidityState() {}

// Submit
const Submit = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<'button'>
>(function Submit(props, forwardRef) {
  return <button type="submit" {...props} ref={forwardRef} />;
});

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

function isAsyncCustomMatcherEntry(
  entry: CustomMatcherEntry,
  args: CustomMatcherArgs,
): entry is AsyncCustomMatcherEntry {
  return (
    entry.match.constructor.name === 'AsyncFunction' ||
    returnsPromise(entry.match, args)
  );
}

function isSyncCustomMatcherEntry(
  entry: CustomMatcherEntry,
): entry is SyncCustomMatcherEntry {
  return entry.match.constructor.name === 'Function';
}

type AnyFunction = (...args: any[]) => any;
function returnsPromise(func: AnyFunction, args: Array<unknown>) {
  return func(...args) instanceof Promise;
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

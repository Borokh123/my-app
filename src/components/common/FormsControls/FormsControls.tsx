import React from 'react';
import { Field, WrappedFieldInputProps, WrappedFieldMetaProps, WrappedFieldProps } from 'redux-form';
import styles from './FormsControls.module.css';
import { FieldValidatorType } from '../../../utils/validators/validators';


// Компонент FormControl
type FormControlPropsType = {
  input: WrappedFieldInputProps;
  meta: WrappedFieldMetaProps;
  children: React.ReactNode; // Add this line to include children
  [key: string]: any; // For additional props
};



// type FormControlType = (params: FormControlParamsType) => React.ReactNode;

export const FormControl: React.FC<FormControlPropsType> = ({ meta: { touched, error }, children }) => {
  const hasError = touched && error;

  return (
    <div className={`${styles.formControl} ${hasError ? styles.error : ''}`}>
      {children}
      {hasError && <span>{error} </span>}
    </div>
  );
};

export default FormControl;

export const Textarea: React.FC<WrappedFieldProps> = ({ input, meta, ...props }) => {
  return (
    <FormControl meta={meta} input={input} >
      <textarea {...input} {...props} />
    </FormControl>
  );
};

export const Input: React.FC<WrappedFieldProps> = ({ input, meta, ...props }) => {
  return (
    <FormControl meta={meta} input={input} >
      <input {...input} {...props} />
    </FormControl>
  );
};



export function createField<FormKeysType extends string>(
  placeholder: string | undefined,
  name: FormKeysType,
  validators: Array<FieldValidatorType>,
  component: React.FC<WrappedFieldProps>,
  props = {},
  text: string = ''
) {
  return (
    <div>
      <Field
        placeholder={placeholder}
        name={name}
        validate={validators}
        component={component}
        {...props}
      />
      {text}
    </div>
  );
}
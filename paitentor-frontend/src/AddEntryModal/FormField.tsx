import React from 'react';
import { Field } from 'formik';
import { Form } from 'semantic-ui-react';
import { EntryType } from '../types';

// structure of a single type
export type EntryTypeOption = {
  value: EntryType;
  label: string;
};

// props for select field component
type SelectFieldProps = {
  name: string;
  label: string;
  options: EntryTypeOption[];
  setType: (type: string) => void;
  // dont know what type handleChange is, might need to fix that later but for now any will suffice
  handleChange: any;
};

export const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  options,
  setType,
  handleChange,
}: SelectFieldProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field
      as="select"
      name={name}
      className="ui dropdown"
      onChange={(e: { target: { value: string } }) => {
        handleChange(e);
        setType(e.target.value);
      }}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </Form.Field>
);

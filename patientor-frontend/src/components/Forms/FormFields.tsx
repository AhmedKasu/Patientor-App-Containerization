import React, { useState } from 'react';
import { ErrorMessage, Field, FieldProps } from 'formik';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { TextField as TextFieldMUI } from '@material-ui/core';

interface Option {
  value: string | number;
  label?: string;
}

interface BaseFieldProps {
  name: string;
  label: string;
  style?: React.CSSProperties;
}

type SelectFieldProps = BaseFieldProps & {
  options: Option[];
};

const FormikSelect = ({ field, ...props }: FieldProps) => (
  <Select {...field} {...props} />
);

export const SelectField = ({
  name,
  label,
  options,
  style,
}: SelectFieldProps) => (
  <>
    <InputLabel>{label}</InputLabel>
    <Field
      fullWidth
      style={{ marginBottom: '0.5em', ...style }}
      label={label}
      component={FormikSelect}
      name={name}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label || option.value}
        </MenuItem>
      ))}
    </Field>
  </>
);

interface TextFieldProps extends BaseFieldProps {
  placeholder: string;
  type?: string;
}

export const TextField = ({
  name,
  label,
  placeholder,
  style,
  type = 'text',
}: TextFieldProps) => (
  <div style={{ marginBottom: '1em', ...style }}>
    <Field
      fullWidth
      as={TextFieldMUI}
      label={label}
      placeholder={placeholder}
      type={type}
      name={name}
    />
    <Typography variant='subtitle2' style={{ color: 'red' }}>
      <ErrorMessage name={name} />
    </Typography>
  </div>
);

interface NumberFieldProps extends BaseFieldProps {
  min: number;
  max: number;
  step?: number;
}

export const NumberField = ({
  name,
  style,
  label,
  min,
  max,
}: NumberFieldProps) => {
  const [value, setValue] = useState<number>(min);

  return (
    <div style={{ marginBottom: '1em', ...style }}>
      <TextFieldMUI
        fullWidth
        label={label}
        type='number'
        name={name}
        value={value}
        onChange={(e) => {
          const value = parseInt(e.target.value);
          if (value === undefined) return;
          if (value > max) setValue(max);
          else if (value <= min) setValue(min);
          else setValue(Math.floor(value));
        }}
      />
      <Typography variant='subtitle2' style={{ color: 'red' }}>
        <ErrorMessage name={name} />
      </Typography>
    </div>
  );
};

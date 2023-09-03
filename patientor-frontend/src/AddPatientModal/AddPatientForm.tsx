import React from 'react';
import { Field } from 'formik';

import { TextField, SelectField, GenderOption } from './FormField';
import { AddPatientSchema } from '../utils/validation';
import CustomForm from '../components/Forms';
import { Gender, Patient } from '../types';

export type PatientFormValues = Omit<Patient, 'id' | 'entries'>;

interface Props {
  onSubmit: (values: PatientFormValues) => void;
  onCancel: () => void;
}

const genderOptions: GenderOption[] = [
  { value: Gender.Male, label: 'Male' },
  { value: Gender.Female, label: 'Female' },
  { value: Gender.Other, label: 'Other' },
];

export const AddPatientForm = ({ onSubmit, onCancel }: Props) => {
  return (
    <CustomForm
      initialValues={{
        name: '',
        ssn: '',
        dateOfBirth: '',
        occupation: '',
        gender: Gender.Other,
      }}
      onSubmit={onSubmit}
      onCancel={onCancel}
      validationSchema={AddPatientSchema}>
      {() => {
        return (
          <>
            <Field
              label='Name'
              placeholder='Name'
              name='name'
              component={TextField}
            />
            <Field
              label='Social Security Number'
              placeholder='SSN'
              name='ssn'
              component={TextField}
            />
            <Field
              label='Date Of Birth'
              placeholder='YYYY-MM-DD'
              name='dateOfBirth'
              component={TextField}
            />
            <Field
              label='Occupation'
              placeholder='Occupation'
              name='occupation'
              component={TextField}
            />
            <SelectField label='Gender' name='gender' options={genderOptions} />
          </>
        );
      }}
    </CustomForm>
  );
};

export default AddPatientForm;

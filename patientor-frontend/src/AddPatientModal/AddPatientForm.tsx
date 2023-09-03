import React from 'react';

import { TextField, SelectField } from '../components/Forms/FormFields';
import { AddPatientSchema } from '../utils/validation';
import CustomForm from '../components/Forms';
import { Gender, Patient } from '../types';

export type PatientFormValues = Omit<Patient, 'id' | 'entries'>;

interface Props {
  onSubmit: (values: PatientFormValues) => void;
  onCancel: () => void;
}

const genderOptions = [
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
            <TextField label='Name' placeholder='Name' name='name' />
            <TextField
              label='Social Security Number'
              placeholder='SSN'
              name='ssn'
            />
            <TextField
              label='Date Of Birth'
              placeholder='YYYY-MM-DD'
              name='dateOfBirth'
            />
            <TextField
              label='Occupation'
              placeholder='Occupation'
              name='occupation'
            />
            <SelectField label='Gender' name='gender' options={genderOptions} />
          </>
        );
      }}
    </CustomForm>
  );
};

export default AddPatientForm;

import * as Yup from 'yup';

const AddPatientSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Name is required.'),
  ssn: Yup.string()
    .matches(
      /^(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[012])\d{2}[-+A]\d{3}[0-9A-F]$/,
      'Invalid SSN format.'
    )
    .required('SSN is Required.'),
  dateOfBirth: Yup.date()
    .required('Birthdate is Required.')
    .max(new Date(), 'Birthdate cannot be in the future.')
    .nullable(),
  occupation: Yup.string().min(3).max(40).required('Occupation is Required.'),
});

export { AddPatientSchema };

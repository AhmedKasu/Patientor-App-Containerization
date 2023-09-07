import * as Yup from 'yup';
import { Entry } from '../../types';

const BaseSchema = Yup.object().shape({
  description: Yup.string()
    .min(5)
    .max(100)
    .required('Description is Required.'),
  date: Yup.string()
    .test('is-today', 'Date must be the current date', (value) => {
      return value === new Date().toISOString().split('T')[0];
    })
    .required('Date is required'),
  specialist: Yup.string().min(3).max(30).required('Specialist is Required.'),
  diagnosisCodes: Yup.array().of(Yup.string()),
});

const HealthCheckSchema = BaseSchema.shape({
  type: Yup.string()
    .oneOf(['HealthCheck'], 'Invalid entry type')
    .required('Entry type is required'),
  healthCheckRating: Yup.number()
    .oneOf(
      [0, 1, 2, 3],
      'HealthCheckRating must be 0 (Healthy), 1 (LowRisk), 2 (HighRisk), or 3 (CriticalRisk)'
    )
    .required('HealthCheckRating is required'),
});

const HospitalSchema = BaseSchema.shape({
  type: Yup.string()
    .oneOf(['Hospital'], 'Invalid entry type')
    .required('Entry type is required'),
  discharge: Yup.object().shape({
    date: Yup.date()
      .min(new Date(), 'Discharge date cannot be in past')
      .required('Discharge date is required'),
    criteria: Yup.string()
      .min(5)
      .max(150)
      .required('Discharge criteria is required'),
  }),
});

const OccupationalHealthcareSchema = BaseSchema.shape({
  type: Yup.string()
    .oneOf(['OccupationalHealthcare'], 'Invalid entry type')
    .required('Entry type is required'),
  employerName: Yup.string().required('Employer name is required'),
  sickLeave: Yup.object().shape({
    startDate: Yup.date()
      .min(new Date(), 'Sick leave start date cannot be in past')
      .required('Sick leave start date is required'),
    endDate: Yup.date()
      .min(Yup.ref('startDate'), "End date can't be before start date")
      .required('Sick leave end date is required'),
  }),
});

const AddEntrySchema = Yup.lazy((entry: Entry) => {
  switch (entry.type) {
    case 'HealthCheck':
      return HealthCheckSchema;
    case 'Hospital':
      return HospitalSchema;
    case 'OccupationalHealthcare':
      return OccupationalHealthcareSchema;
    default:
      return BaseSchema;
  }
}) as unknown as Yup.ObjectSchema<Entry>;

export default AddEntrySchema;

import React from 'react';

import { DiagnosisSelection } from '../AddEntryModal/EntryFormField';
import CustomForm from '../components/Forms';
import { TextField, SelectField } from '../components/Forms/FormFields';
import { EntryType, HealthCheckRating, EntryFormValues } from '../types';
import NewEntrySchema from '../utils/validation/newEntry';
import useDiagnoses from '../hooks/useDiagnoses';
interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const typeOptions = [
  { value: EntryType.HealthCheck, label: 'HealthCheck' },
  { value: EntryType.Hospital, label: 'Hospital' },
  { value: EntryType.OccupationalHealthcare, label: 'OccupationalHealthcare' },
];

const ratingOptions = [
  { value: HealthCheckRating.Healthy, label: 'Healthy' },
  { value: HealthCheckRating.LowRisk, label: 'LowRisk' },
  { value: HealthCheckRating.HighRisk, label: 'HighRisk' },
  { value: HealthCheckRating.CriticalRisk, label: 'CriticalRisk' },
];

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const { diagnoses } = useDiagnoses();
  return (
    <CustomForm<EntryFormValues>
      initialValues={{
        description: '',
        date: new Date().toISOString().slice(0, 10),
        specialist: '',
        diagnosisCodes: [],
        healthCheckRating: 0,
        type: EntryType.HealthCheck,
        discharge: {
          date: '',
          criteria: '',
        },
        employerName: '',
        sickLeave: {
          startDate: '',
          endDate: '',
        },
      }}
      onSubmit={onSubmit}
      validationSchema={NewEntrySchema}
      onCancel={onCancel}>
      {({ setFieldValue, setFieldTouched, values }) => {
        return (
          <>
            <TextField
              label='Description'
              placeholder='Must be at least 5 characters'
              name='description'
            />
            <TextField label='Date' placeholder='YYYY-MM-DD' name='date' />
            <TextField
              label='Specialist'
              placeholder='Must have atleast 3 characters'
              name='specialist'
            />
            {diagnoses && (
              <DiagnosisSelection
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                diagnoses={Object.values(diagnoses)}
              />
            )}
            <SelectField label='Entry type' name='type' options={typeOptions} />
            {values.type === EntryType.HealthCheck && (
              <SelectField
                label='Rating'
                name='healthCheckRating'
                options={ratingOptions}
              />
            )}

            {values.type === EntryType.Hospital && (
              <>
                <TextField
                  label='Discharge Date'
                  placeholder='YYYY-MM-DD'
                  name='discharge.date'
                />
                <TextField
                  label='Discharge Criteria'
                  placeholder='Must have atleast 5 characters'
                  name='discharge.criteria'
                />
              </>
            )}
            {values.type === EntryType.OccupationalHealthcare && (
              <>
                <TextField
                  label='Employer Name'
                  placeholder='Employer name'
                  name='employerName'
                />
                <TextField
                  label='Sick Leave Start Date'
                  placeholder='YYYY-MM-DD'
                  name='sickLeave.startDate'
                />
                <TextField
                  label='Sick Leave End Date'
                  placeholder='YYYY-MM-DD'
                  name='sickLeave.endDate'
                />
              </>
            )}
          </>
        );
      }}
    </CustomForm>
  );
};

export default AddEntryForm;

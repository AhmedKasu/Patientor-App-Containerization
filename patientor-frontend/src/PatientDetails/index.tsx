import React from 'react';
import { useParams } from 'react-router-dom';

import usePatientDetails from '../hooks/usePatientDetails';
import useAddEntry from '../hooks/useAddEntry';
import useDiagnoses from '../hooks/useDiagnoses';

import { Patient, EntryFormValues, Diagnoses } from '../types';

import GenderIcons from '../components/GenderIcons';
import Entries from './Entries';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import AddEntryModal from '../AddEntryModal';
interface Props {
  patient: Patient;
  diagnoses: Diagnoses;
}

export const PatientDetails = ({ patient, diagnoses }: Props) => (
  <>
    <Card sx={{ minWidth: 275, marginTop: '2em' }}>
      <CardContent>
        <Typography variant='h5' component='div'>
          {patient.name} <GenderIcons patient={patient} />
        </Typography>

        <Typography style={{ marginTop: '1em' }} variant='body2'>
          ssn: {patient.ssn}
        </Typography>

        <Typography style={{ marginBottom: '1em' }} variant='body2'>
          {' '}
          occupation: {patient.occupation}
        </Typography>
      </CardContent>
    </Card>
    <Card sx={{ minWidth: 275, marginTop: '2em' }}>
      <CardContent>
        <Typography
          style={{ marginBottom: '0.5em' }}
          variant='h6'
          component='div'>
          Entries
        </Typography>
        <Entries entries={patient.entries} diagnoses={diagnoses} />
      </CardContent>
    </Card>
  </>
);

const PatientDetailsContainer = () => {
  const [refetch, setRefetch] = React.useState<boolean>(false);

  const { id } = useParams<{ id: string }>();
  if (!id) return null;

  const { addEntry, closeModal, error, isModalOpen, openModal } = useAddEntry(
    id,
    setRefetch
  );
  const { patientDetails } = usePatientDetails(id, refetch);
  const { diagnoses } = useDiagnoses();

  const submitNewEntry = (values: EntryFormValues) => addEntry(values);

  return (
    <>
      {patientDetails && diagnoses && (
        <PatientDetails diagnoses={diagnoses} patient={patientDetails} />
      )}

      <Card sx={{ minWidth: 275, marginTop: '2em' }}>
        <CardActions>
          <AddEntryModal
            modalOpen={isModalOpen}
            onSubmit={submitNewEntry}
            onClose={closeModal}
            error={error}
          />
          <Button variant='contained' onClick={() => openModal()}>
            Add new entry
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default PatientDetailsContainer;

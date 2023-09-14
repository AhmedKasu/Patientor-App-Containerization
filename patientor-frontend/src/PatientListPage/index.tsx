import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  Box,
  Table,
  Button,
  TableHead,
  Typography,
  TableCell,
  TableRow,
  TableBody,
} from '@material-ui/core';

import _ from 'lodash';

import { PatientFormValues } from '../AddPatientModal/AddPatientForm';
import AddPatientModal from '../AddPatientModal';
import { Patient, Patients, PublicPatient, PublicPatients } from '../types';
import HealthRatingBar from '../components/HealthRatingBar';
import { getLatestHealthCheckRating } from '../utils/patientDetailsHelper';

import useNewPatient from '../hooks/useNewPatient';
import { useAuthContext } from '../context/authContext';
import usePatients from '../hooks/usePatients';

interface Props {
  patients: Patients | PublicPatients | null;
  currentUser: string | null;
}

export const PatientListPage = ({ patients, currentUser }: Props) => {
  const { addNewPatient, error, closeModal, openModal, isModalOpen } =
    useNewPatient();

  const navigate = useNavigate();

  const submitNewPatient = (values: PatientFormValues) => {
    addNewPatient(values);
  };

  const handleModalButton = () => {
    if (currentUser) {
      openModal();
    } else {
      navigate('/login');
    }
  };

  return (
    <div className='App'>
      <Box>
        <Typography align='center' variant='h6'>
          Patient list
        </Typography>
      </Box>
      <Table style={{ marginBottom: '1em' }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Occupation</TableCell>
            <TableCell>Health Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {_.map(patients, (patient: Patient | PublicPatient) => (
            <TableRow key={patient.id}>
              <TableCell>
                <Link to={`/patients/${patient.id}`}>{patient.name}</Link>
              </TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>{patient.occupation}</TableCell>
              <TableCell>
                <HealthRatingBar
                  showText={currentUser ? true : false}
                  rating={
                    currentUser && isPatient(patient)
                      ? getLatestHealthCheckRating(patient)
                      : 10
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AddPatientModal
        modalOpen={isModalOpen}
        onSubmit={submitNewPatient}
        error={error}
        onClose={closeModal}
      />
      <Button variant='contained' onClick={handleModalButton}>
        Add New Patient
      </Button>
    </div>
  );
};

const isPatient = (patient: Patient | PublicPatient): patient is Patient => {
  return (patient as Patient).ssn !== undefined;
};

const PatientListPageContainer = () => {
  const [patients] = usePatients();
  const { currentUser } = useAuthContext();
  return (
    <>
      <PatientListPage patients={patients} currentUser={currentUser} />
    </>
  );
};

export default PatientListPageContainer;

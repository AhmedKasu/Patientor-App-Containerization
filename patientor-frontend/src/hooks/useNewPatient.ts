import { useState } from 'react';

import api from '../config/api';
import { usePatientsContext } from '../context/patientsContext';
import { PatientFormValues } from '../AddPatientModal/AddPatientForm';
import { Patient } from '../types';
import handleAxiosError from '../utils/axiosErrorHandler';

const useNewPatient = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const { setPatients } = usePatientsContext();

  const addNewPatient = (patientData: PatientFormValues): void => {
    api
      .post('/patients', patientData)
      .then((response) => {
        const newPatient = response.data as Patient;

        setPatients((prevPatients) => ({
          ...prevPatients,
          [newPatient.id]: newPatient,
        }));

        closeModal();
      })
      .catch(handleAxiosError(setError));
  };

  return { addNewPatient, error, isModalOpen, openModal, closeModal };
};

export default useNewPatient;

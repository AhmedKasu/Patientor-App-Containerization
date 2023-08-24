import { useState } from 'react';
import axios from 'axios';

import { usePatientsContext } from '../context/patientsContext';
import { PatientFormValues } from '../AddPatientModal/AddPatientForm';
import { Patient } from '../types';
import handleAxiosError from '../utils/axiosErrorHandler';

const useNewPatient = (apiBaseUrl: string) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const { setPatients } = usePatientsContext();

  const addNewPatient = (patientData: PatientFormValues): void => {
    axios
      .post(`${apiBaseUrl}/patients`, patientData)
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

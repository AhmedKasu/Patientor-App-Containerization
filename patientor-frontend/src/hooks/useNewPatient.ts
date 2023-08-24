import { useState } from 'react';
import axios from 'axios';
import CanceledError from 'axios';

import { usePatientsContext } from '../context/patientsContext';
import { PatientFormValues } from '../AddPatientModal/AddPatientForm';
import { Patient } from '../types';

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
      .catch((error: unknown) => {
        if (error instanceof CanceledError) return;
        if (axios.isAxiosError(error)) {
          setError(
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            String(error.response?.data.error) ||
              'Error from server with no message'
          );
        } else setError('Unknown error occurred');
      });
  };

  return { addNewPatient, error, isModalOpen, openModal, closeModal };
};

export default useNewPatient;

import { useState, useEffect } from 'react';

import { PatientInfo } from '../types';
import api from '../config/api';
import handleAxiosError from '../utils/axiosErrorHandler';

const usePatientDetails = (id: string, refetch: boolean) => {
  const [patientDetails, setPatientDetails] = useState<PatientInfo | null>(
    null
  );
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    api
      .get<PatientInfo>(`/patients/${id}`)
      .then((response) => {
        setPatientDetails(response.data);
      })
      .catch(handleAxiosError(setError));
  }, [id, refetch]);

  return { patientDetails, error };
};

export default usePatientDetails;

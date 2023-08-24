import { useState, useEffect } from 'react';
import axios from 'axios';

import { PatientInfo } from '../types';
import { apiBaseUrl } from '../constants';
import handleAxiosError from '../utils/axiosErrorHandler';

const usePatientDetails = (id: string, refetch: boolean) => {
  const [patientDetails, setPatientDetails] = useState<PatientInfo | null>(
    null
  );
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    axios
      .get<PatientInfo>(`${apiBaseUrl}/patients/${id}`)
      .then((response) => {
        setPatientDetails(response.data);
      })
      .catch(handleAxiosError(setError));
  }, [id, refetch]);

  return { patientDetails, error };
};

export default usePatientDetails;

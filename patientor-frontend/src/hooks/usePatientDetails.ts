import { useState, useEffect } from 'react';
import axios from 'axios';
import CanceledError from 'axios';

import { PatientInfo } from '../types';
import { apiBaseUrl } from '../constants';

const usePatientDetails = (id: string, refetch: boolean) => {
  const [patientDetails, setPatientDetails] = useState<PatientInfo | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<PatientInfo>(`${apiBaseUrl}/patients/${id}`)
      .then((response) => {
        setPatientDetails(response.data);
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
  }, [id, refetch]);

  return { patientDetails, error };
};

export default usePatientDetails;

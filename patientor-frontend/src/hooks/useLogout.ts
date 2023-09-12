import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

import api from '../config/api';
import { useAuthContext } from '../context/authContext';

const useLogout = (): {
  logout: () => void;
  successAlert: boolean;
  errorAlert: boolean;
} => {
  const [successAlert, setSuccessAlert] = useState<boolean>(false);
  const [errorAlert, setErrorAlert] = useState<boolean>(false);

  const { setCurrentUser, setCsrfToken, setError } = useAuthContext();
  const navigate = useNavigate();

  const logout = (): void => {
    api
      .post('/users/logout')
      .then(() => {
        setCurrentUser(null);
        setCsrfToken(null);
        setSuccessAlert(true);
        setTimeout(() => {
          setSuccessAlert(false);
          navigate('/');
        }, 2000);
      })
      .catch((error: AxiosError) => {
        setError(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          String(error.response?.data.error) ||
            'Error from server with no message'
        );
        setErrorAlert(true);
        setTimeout(() => {
          setErrorAlert(false);
          setError(undefined);
        }, 3000);
      });
  };
  return { logout, successAlert, errorAlert };
};

export default useLogout;

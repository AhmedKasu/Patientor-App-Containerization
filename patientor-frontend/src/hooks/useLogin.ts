import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

import api from '../config/api';
import { useAuthContext } from '../context/authContext';
import { LoginInput } from '../types';

interface ResObject {
  csrfToken: string;
  user: string;
}
const useLogin = (): {
  login: (loginInput: LoginInput) => void;
  successAlert: boolean;
  errorAlert: boolean;
} => {
  const [successAlert, setSuccessAlert] = useState<boolean>(false);
  const [errorAlert, setErrorAlert] = useState<boolean>(false);

  const { setError, setCurrentUser, setCsrfToken } = useAuthContext();
  const navigate = useNavigate();

  const login = (loginInput: LoginInput): void => {
    api
      .post<ResObject>('/users/login', loginInput)
      .then((res) => {
        setCsrfToken(res.data.csrfToken);
        setCurrentUser(res.data.user);
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
  return { login, successAlert, errorAlert };
};

export default useLogin;

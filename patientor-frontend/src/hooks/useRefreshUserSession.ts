import handleAxiosError from '../utils/axiosErrorHandler';
import { useAuthContext } from '../context/authContext';

import api from '../config/api';
import { User } from '../types';

interface RefreshedSession {
  user: User;
  csrfToken: string;
}
const useRefreshUserSession = (): {
  refreshUserSession: () => Promise<boolean>;
} => {
  const { setError, setCurrentUser, setCsrfToken } = useAuthContext();

  const refreshUserSession = (): Promise<boolean> => {
    return new Promise((resolve, _reject) => {
      api
        .get<RefreshedSession>('/users/me')
        .then((res) => {
          if (res.status === 401 || res.status === 400) {
            setCurrentUser(null);
            setCsrfToken(null);
            resolve(false);
          } else {
            setCurrentUser(res.data.user.name);
            setCsrfToken(res.data.csrfToken);
            resolve(true);
          }
        })
        .catch((err) => {
          handleAxiosError(setError)(err);
          resolve(false);
        });
    });
  };

  return { refreshUserSession };
};

export default useRefreshUserSession;

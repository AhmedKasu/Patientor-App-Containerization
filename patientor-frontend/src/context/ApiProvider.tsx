import React, { useEffect } from 'react';
import { useAuthContext } from './authContext';
import api from '../config/api';

const ApiProvider: React.FC = ({ children }) => {
  const { csrfToken } = useAuthContext();

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use((config) => {
      const stateChangingMethods = ['POST', 'PUT', 'DELETE'];
      if (
        stateChangingMethods.includes(config.method?.toUpperCase() as string)
      ) {
        config.headers = {
          ...config.headers,
          'x-csrf-token': csrfToken as string,
        };
      }
      return config;
    });

    return () => {
      api.interceptors.request.eject(requestInterceptor);
    };
  }, [csrfToken]);

  return <>{children}</>;
};

export default ApiProvider;

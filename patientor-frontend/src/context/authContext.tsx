import React, { createContext, useContext, useState } from 'react';

interface AuthContext {
  currentUser: string | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<string | null>>;
  csrfToken: string | null;
  setCsrfToken: React.Dispatch<React.SetStateAction<string | null>>;
  error: string | undefined;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const AuthContext = createContext<AuthContext | undefined>(undefined);

export const useAuthContext = (): AuthContext => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        csrfToken,
        setCsrfToken,
        error,
        setError,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

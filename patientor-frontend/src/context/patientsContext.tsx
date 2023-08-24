import React, { createContext, useContext, useState } from 'react';
import { Patients } from '../types';

interface PatientsContextType {
  patients: Patients | null;
  setPatients: React.Dispatch<React.SetStateAction<Patients | null>>;
  error: string | undefined;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const PatientsContext = createContext<PatientsContextType | undefined>(
  undefined
);

export const usePatientsContext = () => {
  const context = useContext(PatientsContext);
  if (!context) {
    throw new Error('usePatientsContext must be used within PatientsProvider');
  }
  return context;
};

export const PatientsProvider: React.FC = ({ children }) => {
  const [patients, setPatients] = useState<Patients | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);

  return (
    <PatientsContext.Provider
      value={{ patients, setPatients, error, setError }}>
      {children}
    </PatientsContext.Provider>
  );
};

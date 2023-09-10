import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { PatientsProvider } from './context/patientsContext';
import { AuthProvider } from './context/authContext';

ReactDOM.render(
  <PatientsProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </PatientsProvider>,

  document.getElementById('root')
);

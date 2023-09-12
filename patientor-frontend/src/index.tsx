import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { PatientsProvider } from './context/patientsContext';
import { AuthProvider } from './context/authContext';
import ApiProvider from './context/ApiProvider';

ReactDOM.render(
  <PatientsProvider>
    <AuthProvider>
      <ApiProvider>
        <App />
      </ApiProvider>
    </AuthProvider>
  </PatientsProvider>,

  document.getElementById('root')
);

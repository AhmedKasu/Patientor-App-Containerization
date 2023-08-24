import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { PatientsProvider } from './context/patientsContext';

ReactDOM.render(
  <PatientsProvider>
    <App />
  </PatientsProvider>,

  document.getElementById('root')
);

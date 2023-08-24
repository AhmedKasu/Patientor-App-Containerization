import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Button, Divider, Container, Typography } from '@material-ui/core';

import PatientListPage from './PatientListPage';
import PatientDetails from './PatientDetails';

import usePatients from './hooks/usePatients';

const App = () => {
  const [patients] = usePatients();

  return (
    <div className='App'>
      <Router>
        <Container>
          <Typography variant='h3' style={{ marginBottom: '0.5em' }}>
            Patientor
          </Typography>
          <Button component={Link} to='/' variant='contained' color='primary'>
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path='/patients/:id' element={<PatientDetails />} />
            <Route
              path='/'
              element={patients && <PatientListPage patients={patients} />}
            />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;

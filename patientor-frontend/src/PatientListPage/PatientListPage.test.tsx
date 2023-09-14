import React from 'react';
import '@testing-library/jest-dom';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { PatientListPage } from '.';
import { Gender } from '../types';
import renderWithRouter from '../utils/testUtils/renderWithRouter';

import Login from '../AuthPages/Login';

const patients = {
  'd2773336-f723-11e9-8f0b-362b9e111227': {
    id: 'd2773336-f723-11e9-8f0b-362b9e111227',
    name: 'Andre Onana',
    dateOfBirth: '1988-07-09',
    ssn: '090788-122X',
    gender: Gender.Male,
    occupation: 'Football Player',
    entries: [
      {
        date: '2019-05-01T00:00:00.000Z',
        specialist: 'Dr Byte House',
        description: 'Digital overdose, very bytestatic. Otherwise healthy.',
        patient: 'd2773336-f723-11e9-8f0b-362b9e111227',
        type: 'HealthCheck',
        healthCheckRating: 0,
        id: '64e5fc0f528f772e86e2d275',
      },
    ],
  },
  'e32114445-f711-11e9-8f0b-362b9e133367': {
    id: 'e32114445-f711-11e9-8f0b-362b9e133367',
    name: 'Alycia Keys',
    dateOfBirth: '1979-07-09',
    ssn: '090779-462X',
    gender: Gender.Female,
    occupation: 'Artist',
    entries: [
      {
        date: '2019-10-20T00:00:00.000Z',
        specialist: 'MD House',
        description: 'Yearly control visit. Cholesterol levels back to normal.',
        patient: '64e5e4b1d4483c818fb7883c',
        type: 'HealthCheck',
        healthCheckRating: 1,
        id: '64e5e6e668d553630f31d8be',
      },
    ],
  },
};

describe('<PatientListPage /> for non logged in users', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    const routes = [{ element: <Login />, path: '/login' }];

    renderWithRouter(
      <PatientListPage patients={patients} currentUser={null} />,
      routes
    );
  });

  test('renders content', () => {
    expect(screen.getByText('Patient list')).toBeInTheDocument();
    expect(screen.getByText('Add New Patient')).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByText('Andre Onana')).toBeInTheDocument();
    expect(screen.getByText('Alycia Keys')).toBeInTheDocument();
    expect(screen.getByText('male')).toBeInTheDocument();
    expect(screen.getByText('female')).toBeInTheDocument();
    expect(screen.getByText('Football Player')).toBeInTheDocument();
    expect(screen.getByText('Artist')).toBeInTheDocument();
    expect(screen.getByText('Health Rating')).toBeInTheDocument();
  });

  test('ratings content is rendered', () => {
    expect(
      screen.queryByText('The patient is in great shape')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText('The patient has a low risk of getting sick')
    ).not.toBeInTheDocument();
  });

  test('clicking add new patient button navigates to the login page', async () => {
    const addNewPatientButton = screen.getByText('Add New Patient');
    expect(addNewPatientButton).toBeInTheDocument();

    await user.click(addNewPatientButton);

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent(
        'Login'
      );
      expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    });
  });
});

describe('<PatientListPage /> for logged in users', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    const routes = [{ element: <Login />, path: '/login' }];

    renderWithRouter(
      <PatientListPage patients={patients} currentUser={'Test User'} />,
      routes
    );
  });

  test('renders content', () => {
    expect(screen.getByText('Patient list')).toBeInTheDocument();
    expect(screen.getByText('Add New Patient')).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByText('Andre Onana')).toBeInTheDocument();
    expect(screen.getByText('Alycia Keys')).toBeInTheDocument();
    expect(screen.getByText('male')).toBeInTheDocument();
    expect(screen.getByText('female')).toBeInTheDocument();
    expect(screen.getByText('Football Player')).toBeInTheDocument();
    expect(screen.getByText('Artist')).toBeInTheDocument();
    expect(screen.getByText('Health Rating')).toBeInTheDocument();
  });

  test('ratings content is not renderd', () => {
    expect(
      screen.getByText('The patient is in great shape')
    ).toBeInTheDocument();
    expect(
      screen.getByText('The patient has a low risk of getting sick')
    ).toBeInTheDocument();
  });

  test('clicking add new patient button opens add patient form modal', async () => {
    const addNewPatientButton = screen.getByText('Add New Patient');
    expect(addNewPatientButton).toBeInTheDocument();

    await user.click(addNewPatientButton);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Add a new patient')).toBeInTheDocument();
  });
});

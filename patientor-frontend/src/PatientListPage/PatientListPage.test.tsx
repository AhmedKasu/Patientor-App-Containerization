import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import PatientListPage from '.';
import { Gender } from '../types';

describe('<PatientListPage />', () => {
  const user = userEvent.setup();
  const patients = {
    'd2773336-f723-11e9-8f0b-362b9e111227': {
      id: 'd2773336-f723-11e9-8f0b-362b9e111227',
      name: 'Andre Onana',
      dateOfBirth: '1988-07-09',
      ssn: '090788-122X',
      gender: Gender.Male,
      occupation: 'Football Player',
      entries: [],
    },
    'e32114445-f711-11e9-8f0b-362b9e133367': {
      id: 'e32114445-f711-11e9-8f0b-362b9e133367',
      name: 'Alycia Keys',
      dateOfBirth: '1979-07-09',
      ssn: '090779-462X',
      gender: Gender.Female,
      occupation: 'Artist',
      entries: [],
    },
  };

  beforeEach(() => {
    render(<PatientListPage patients={patients} />, { wrapper: BrowserRouter });
  });

  test('renders content', () => {
    expect(screen.getByText('Patient list')).toBeDefined();
    expect(screen.getByText('Add New Patient')).toBeDefined();
    expect(screen.getByRole('table')).toBeDefined();
    expect(screen.getByText('Andre Onana')).toBeDefined();
    expect(screen.getByText('Alycia Keys')).toBeDefined();
    expect(screen.getByText('male')).toBeDefined();
    expect(screen.getByText('female')).toBeDefined();
  });

  test('clicking add new patient button opens modal', async () => {
    const addNewPatientButton = screen.getByText('Add New Patient');
    expect(addNewPatientButton).toBeDefined();

    await user.click(addNewPatientButton);

    expect(screen.getByRole('dialog')).toBeDefined();
    expect(screen.getByText('Add a new patient')).toBeDefined();
  });
});

import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'

import PatientListPage from '.'
import { Gender } from '../types'

describe('<PatientListPage />', () => {
  const patients = {
    'd2773336-f723-11e9-8f0b-362b9e111227': {
      id: 'd2773336-f723-11e9-8f0b-362b9e111227',
      name: 'Andre Onana',
      dateOfBirth: '1988-07-09',
      ssn: '090788-122X',
      gender: Gender.Male,
      occupation: 'Football Player',
    },
    'e32114445-f711-11e9-8f0b-362b9e133367': {
      id: 'e32114445-f711-11e9-8f0b-362b9e133367',
      name: 'Alycia Keys',
      dateOfBirth: '1979-07-09',
      ssn: '090779-462X',
      gender: Gender.Female,
      occupation: 'Artist',
    },
  }

  beforeEach(() => {
    render(<PatientListPage patients={patients} />, { wrapper: BrowserRouter })
  })

  test('renders content', () => {
    const header = screen.getByText('Patient list')
    const addNewPatientButton = screen.getByText('Add New Patient')
    const patientName1 = screen.getByText('Andre Onana')
    const patientName2 = screen.getByText('Alycia Keys')
    const patient1gender = screen.getByText('male')
    const patient2gender = screen.getByText('female')

    expect(header).toBeDefined()
    expect(addNewPatientButton).toBeDefined()
    expect(patientName1).toBeDefined()
    expect(patientName2).toBeDefined()
    expect(patient1gender).toBeDefined()
    expect(patient2gender).toBeDefined()
  })
})

import React from 'react';
import Male from '@mui/icons-material/Male';
import Female from '@mui/icons-material/Female';
import { Patient } from '../types';

interface Props {
  patient: Patient;
}

const GenderIcons = ({ patient }: Props) => {
  const { gender } = patient;
  const renderGender = () => {
    if (gender === 'male') {
      return <Male />;
    } else if (gender === 'female') {
      return <Female />;
    }
  };
  return <>{renderGender()}</>;
};

export default GenderIcons;

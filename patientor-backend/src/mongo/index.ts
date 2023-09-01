import { connect, connection } from 'mongoose';
import Patient from './models/Patient';
import HospitalEntry from './models/HospitalEntry';
import HealthCheckEntry from './models/HealthCheckEntry';
import OccupationalHealthcareEntry from './models/OccupationalHealthcareEntry';
import User from './models/User';
import { MONGO_URL } from '../utils/config';

if (!connection.readyState) {
  connect(MONGO_URL)
    .then(() => {
      console.log('connected to MongoDB');
    })
    .catch((error) => {
      console.log('error connection to MongoDB:', error.message);
    });
}

export {
  Patient,
  HospitalEntry,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
  User,
};

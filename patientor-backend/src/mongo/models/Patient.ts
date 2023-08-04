import mongoose from 'mongoose';
import { Patient } from '../../types';
interface PatientModel extends Patient {
  entriesModel?: {
    type: StringConstructor;
    required: boolean;
    enum: string[];
  };
}

const patientSchema = new mongoose.Schema<PatientModel>({
  name: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  ssn: { type: String, required: true },
  gender: { type: String, required: true },
  occupation: { type: String, required: true },
  entries: [
    {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'entriesModel',
    },
  ],
  entriesModel: {
    type: String,
    enum: ['HospitalEntry', 'HealthCheckEntry', 'OccupationalHealthcareEntry'],
  },
});

export default mongoose.model('Patient', patientSchema);

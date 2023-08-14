import mongoose from 'mongoose';
import { OccupationalHealthcareEntry } from 'src/types';

const occupationalHealthcareEntrySchema =
  new mongoose.Schema<OccupationalHealthcareEntry>({
    date: { type: String, required: true },
    specialist: { type: String, required: true },
    type: { type: String, default: 'OccupationalHealthcare' },
    description: { type: String, required: true },
    employerName: { type: String, required: true },
    sickLeave: {
      startDate: { type: String, required: false },
      endDate: { type: String, required: false },
    },
    diagnosisCodes: [{ type: String, required: false }],
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Patient',
    },
  });

export default mongoose.model(
  'OccupationalHealthcareEntry',
  occupationalHealthcareEntrySchema
);

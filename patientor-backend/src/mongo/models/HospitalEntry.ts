import mongoose from 'mongoose';
import { HospitalEntry } from 'src/types';

const hospitalEntrySchema = new mongoose.Schema<HospitalEntry>({
  date: { type: String, required: true },
  specialist: { type: String, required: true },
  type: { type: String, default: 'Hospital' },
  description: { type: String, required: true },
  discharge: {
    date: { type: String, required: true },
    criteria: { type: String, required: true },
  },
  diagnosisCodes: [{ type: String, required: false }],
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Patient',
  },
});

export default mongoose.model('HospitalEntry', hospitalEntrySchema);

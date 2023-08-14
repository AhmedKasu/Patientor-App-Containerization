import mongoose from 'mongoose';
import { HealthCheckEntry } from 'src/types';

const healthCheckEntrySchema = new mongoose.Schema<HealthCheckEntry>({
  date: { type: String, required: true },
  specialist: { type: String, required: true },
  type: { type: String, default: 'HealthCheck' },
  description: { type: String, required: true },
  healthCheckRating: { type: Number, required: true, min: 0, max: 3 },
  diagnosisCodes: [{ type: String, required: false }],
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Patient',
  },
});

export default mongoose.model('HealthCheckEntry', healthCheckEntrySchema);

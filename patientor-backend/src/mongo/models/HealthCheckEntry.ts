import mongoose from 'mongoose';
import BaseEntrySchema, { BaseEntryInterface } from './BaseEntry';
import transform_idToId from '../../utils/modelHelpers';
interface HealthCheckEntry extends BaseEntryInterface {
  healthCheckRating: number;
}
const healthCheckEntrySchema = new mongoose.Schema<HealthCheckEntry>({
  ...BaseEntrySchema.obj,
  type: { type: String, default: 'HealthCheck' },
  healthCheckRating: { type: Number, required: true, min: 0, max: 3 },
});

transform_idToId(healthCheckEntrySchema);

export default mongoose.model('HealthCheck', healthCheckEntrySchema);

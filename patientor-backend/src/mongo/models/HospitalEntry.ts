import mongoose from 'mongoose';
import BaseEntrySchema, { BaseEntryInterface } from './BaseEntry';
import transform_idToId from '../../utils/modelHelpers';
interface HospitalEntry extends BaseEntryInterface {
  discharge: {
    date: string;
    criteria: string;
  };
}
const hospitalEntrySchema = new mongoose.Schema<HospitalEntry>({
  ...BaseEntrySchema.obj,
  type: { type: String, default: 'Hospital' },
  discharge: {
    date: { type: String, required: true },
    criteria: { type: String, required: true },
  },
});

transform_idToId(hospitalEntrySchema);

export default mongoose.model('Hospital', hospitalEntrySchema);

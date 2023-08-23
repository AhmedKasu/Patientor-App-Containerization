import mongoose from 'mongoose';
import BaseEntrySchema, { BaseEntryInterface } from './BaseEntry';
import transform_idToId from '../../utils/modelHelpers';
interface OccupationalHealthcareEntry extends BaseEntryInterface {
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

const occupationalHealthcareEntrySchema =
  new mongoose.Schema<OccupationalHealthcareEntry>({
    ...BaseEntrySchema.obj,
    type: { type: String, default: 'OccupationalHealthcare' },
    employerName: { type: String, required: true },
    sickLeave: {
      startDate: { type: String, required: false },
      endDate: { type: String, required: false },
    },
  });

transform_idToId(occupationalHealthcareEntrySchema);

export default mongoose.model(
  'OccupationalHealthcare',
  occupationalHealthcareEntrySchema
);

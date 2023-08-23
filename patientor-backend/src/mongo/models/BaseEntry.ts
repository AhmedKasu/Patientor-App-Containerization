import { Schema, Types } from 'mongoose';

interface PatientReference {
  type: Types.ObjectId;
  ref: 'Patient';
}
export interface BaseEntryInterface {
  date: Date;
  type: string;
  specialist: string;
  diagnosisCodes?: string[];
  description: string;
  patient: PatientReference;
}

const baseEntrySchema = new Schema<BaseEntryInterface>({
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  specialist: { type: String, required: true },
  diagnosisCodes: { type: [String], default: undefined },
  description: { type: String, required: true },
  patient: {
    type: Types.ObjectId,
    ref: 'Patient',
  },
});

export default baseEntrySchema;

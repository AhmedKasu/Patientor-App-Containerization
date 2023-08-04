import mongoose, { Document } from 'mongoose';
import { Diagnosis } from '../../types';

const diagnosisSchema = new mongoose.Schema<Diagnosis>({
  code: { type: String, required: true },
  name: { type: String, required: true },
  latin: { type: String },
});

diagnosisSchema.set('toJSON', {
  transform: (_document: Document, returnedObject: Record<string, string>) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model('Diagnosis', diagnosisSchema, 'diagnoses');

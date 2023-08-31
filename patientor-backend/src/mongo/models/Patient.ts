import mongoose, { Document, Types } from 'mongoose';
import { EntryTypes } from 'src/types';
interface EntryReference {
  entryId: Types.ObjectId;
  entryModel: EntryTypes;
  _id: Types.ObjectId;
}
export interface PatientModelInterface extends Document {
  _id?: Types.ObjectId;
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: EntryReference[];
}

const patientSchema = new mongoose.Schema<PatientModelInterface>({
  name: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  ssn: { type: String, required: true },
  gender: { type: String, required: true },
  occupation: { type: String, required: true },
  entries: [
    {
      entryId: {
        type: Types.ObjectId,
        required: true,
        refPath: 'entries.entryModel',
      },
      entryModel: {
        type: String,
        required: true,
        enum: ['Hospital', 'HealthCheck', 'OccupationalHealthcare'],
      },
      _id: false,
    },
  ],
});

patientSchema.set('toJSON', {
  transform: (
    _document: Document,
    returnedObject: Record<string, string | Types.ObjectId[]>
  ) => {
    returnedObject.id = returnedObject._id?.toString();
    delete returnedObject._id;
    delete returnedObject.__v;

    if (returnedObject.entries) {
      returnedObject.entries = (
        returnedObject.entries as unknown as EntryReference[]
      ).map((entryReference: EntryReference) => entryReference.entryId);
    }
  },
});

export default mongoose.model<PatientModelInterface>('Patient', patientSchema);

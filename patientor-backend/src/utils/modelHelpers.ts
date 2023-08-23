import { Document, Schema } from 'mongoose';

const transform_idToId = (schema: Schema) => {
  schema.set('toJSON', {
    transform: (
      _document: Document,
      returnedObject: Record<string, string>
    ) => {
      returnedObject.id = returnedObject._id?.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    },
  });
};

export default transform_idToId;

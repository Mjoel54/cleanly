// Schema will define the structure of the documents
// model is used to create a model from a schema
// Document: A Typescript interface from Mongoose that provide document methods

import { Schema, model, Document } from "mongoose";

// Extends the Mongoose Document interface giving it all MongoDB document properties
// Defines which properties Room will have
export interface IRoom extends Document {
  name: string;
}

// We use IRoom as the type of the Schema
// Defines the name field properties
const roomSchema = new Schema<IRoom>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Creates a Mongoose model that is named Room, uses the Schema we defined, is typed using the IRoom interface
const Room = model<IRoom>("Room", roomSchema);

// Exports the Room model
export default Room;

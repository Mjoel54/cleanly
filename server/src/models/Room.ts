// Document: A Typescript interface from Mongoose that provide document methods
// Schema will define the structure of the documents
// model is used to create a model from a schema

import { Schema, model, Document } from "mongoose";

// Extends the Mongoose Document interface giving it all MongoDB document properties
// Defines which properties Room will have
export interface IRoom extends Document {
  name: string;
}

// We use IRoom as the type of the Schema
// This schema will map to the Room collection and define the shape of the documents within that collection
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

// To use the schema definition, we need to convert roomSchema into a Model we can work with
const Room = model<IRoom>("Room", roomSchema);

// Exports the Room model
export default Room;

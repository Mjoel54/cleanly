// Document: A Typescript interface from Mongoose that provide document methods
// Schema will define the structure of the documents
// model is used to create a model from a schema

import { Schema, model, Document, ObjectId } from "mongoose";

// Extends the Mongoose Document interface giving it all MongoDB document properties
// Defines which properties Room will have
export interface IRoom extends Document {
  name: string;
  createdAt: Date;
  tasks: ObjectId[];
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
    createdAt: {
      type: Date,
      default: Date.now,
    },
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Task", // Where is this reference coming from?
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// To use the schema definition, we need to convert roomSchema into a Model we can work with
const Room = model<IRoom>("Room", roomSchema);

// Exports the Room model
export default Room;

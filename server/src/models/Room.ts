// Document: A Typescript interface from Mongoose that provide document methods
// Schema will define the structure of the documents
// model is used to create a model from a schema

import { Schema, model, Document, ObjectId } from "mongoose";

// Extends the Mongoose Document interface giving it all MongoDB document properties
// Defines which properties Room will have
export interface IRoom extends Document {
  name: string;
  tasks: ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

// We use IRoom as the type of the Schema
// This schema will map to the Room collection and define the shape of the documents within that collection
const roomSchema = new Schema<IRoom>(
  {
    name: {
      type: String,
      required: [true, "Room name is required"],
      trim: true,
      maxLength: 30,
    },
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Task", // The ref property inside the tasks array tells Mongoose that each ObjectId in tasks refers to a document in another collection, specifically the Task collection.
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: { getters: true },
  }
);

// To use the schema definition, we need to convert roomSchema into a Model we can work with
const Room = model<IRoom>("Room", roomSchema);

// Exports the Room model
export default Room;

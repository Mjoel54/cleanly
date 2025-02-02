// Document: A Typescript interface from Mongoose that provide document methods
// Schema will define the structure of the documents
// model is used to create a model from a schema

import { Schema, model, Document } from "mongoose";

// Extends the Mongoose Document interface giving it all MongoDB document properties
// Defines which properties Room will have
export interface ITask extends Document {
  name: string;
  description?: string;
}

// Use ITask as the type of the Schema
// This schema will map to the Task collection and define the shape of the documents within that collection
const taskSchema = new Schema<ITask>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false, // MongoDB will allow documents without a description field
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// To use the schema definition, we need to convert taskSchema into a Model we can work with
const Task = model<ITask>("Task", taskSchema);

// Export the Task model
export default Task;

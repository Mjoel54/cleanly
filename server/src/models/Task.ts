// Document: A Typescript interface from Mongoose that provide document methods
// Schema will define the structure of the documents
// model is used to create a model from a schema

import { Schema, model, Document } from "mongoose";

// Define allowed task statuses
export type TaskStatus = "active" | "completed" | "deleted";

// Extends the Mongoose Document interface giving it all MongoDB document properties
// Defines which properties Room will have
export interface ITask extends Document {
  name: string;
  description?: string;
  status?: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}

// Use ITask as the type of the Schema
// This schema will map to the Task collection and define the shape of the documents within that collection
const taskSchema = new Schema<ITask>(
  {
    name: {
      type: String,
      required: [true, "Task name is required"],
      trim: true,
      maxlength: 50,
    },
    description: {
      type: String,
      required: false, // MongoDB will allow documents without a description field
      trim: true,
      maxLength: 100,
    },
    status: {
      type: String,
      required: false,
      enum: ["active", "completed", "deleted"],
      default: "active",
    },
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

// To use the schema definition, we need to convert taskSchema into a Model we can work with
const Task = model<ITask>("Task", taskSchema);

// Export the Task model
export default Task;

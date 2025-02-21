// Document: A Typescript interface from Mongoose that provide document methods
// Schema will define the structure of the documents
// model is used to create a model from a schema

import { Schema, model, Document } from "mongoose";

// Extends the Mongoose Document interface giving it all MongoDB document properties
// Defines which properties Room will have
export interface ITask extends Document {
  name?: string;
  description?: string;
  dueDate?: number;
  isCompleted?: boolean;
  completedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  room: Schema.Types.ObjectId;
}

// Use ITask as the type of the Schema
// This schema will map to the Task collection and define the shape of the documents within that collection
const taskSchema = new Schema<ITask>(
  {
    name: {
      type: String,
      required: false,
      default: "",
      trim: true,
      maxlength: 50,
    },
    description: {
      type: String,
      required: false, // MongoDB will allow documents without a description field
      trim: true,
      maxLength: 100,
    },
    dueDate: {
      type: Number,
      required: false,
    },
    isCompleted: {
      type: Boolean,
      required: false,
      default: false,
    },
    completedAt: {
      type: Date,
      required: false,
      default: null, // Store timestamp when task is marked completed
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
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

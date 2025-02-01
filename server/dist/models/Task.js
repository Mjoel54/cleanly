// Document: A Typescript interface from Mongoose that provide document methods
// Schema will define the structure of the documents
// model is used to create a model from a schema
import { Schema, model } from "mongoose";
// Use ITask as the type of the Schema
// This schema will map to the Task collection and define the shape of the documents within that collection
const taskSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: false,
        trim: true,
    },
}, {
    timestamps: true,
});
// To use the schema definition, we need to convert taskSchema into a Model we can work with
const Task = model("Task", taskSchema);
// Export the Task model
export default Task;

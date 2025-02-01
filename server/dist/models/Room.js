// Document: A Typescript interface from Mongoose that provide document methods
// Schema will define the structure of the documents
// model is used to create a model from a schema
import { Schema, model } from "mongoose";
// We use IRoom as the type of the Schema
// Defines the name field properties
const roomSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
}, {
    timestamps: true,
});
// Creates a Mongoose model that is named Room, uses the Schema we defined, is typed using the IRoom interface
const Room = model("Room", roomSchema);
// Exports the Room model
export default Room;

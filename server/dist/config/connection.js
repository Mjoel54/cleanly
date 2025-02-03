import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    throw new Error("MongoDB URI is missing.");
}
const db = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Database connected.");
        return mongoose.connection;
    }
    catch (error) {
        console.error("Database connection error:", error);
        throw new Error("Database connection failed.");
    }
};
export default db;

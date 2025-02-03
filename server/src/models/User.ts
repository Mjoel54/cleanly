import { Schema, Document, model, ObjectId } from "mongoose";
import bcrypt from "bcrypt";

interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  rooms: ObjectId[];
  tasks: ObjectId[];
  isCorrectPassword(password: string): Promise<boolean>;
}

// Schema to create User model
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must match an email address!"],
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    rooms: [
      {
        type: Schema.Types.ObjectId,
        ref: "Room", // Where is this reference coming from?
      },
    ],
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Task", // Where is this reference coming from?
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

// set up pre-save middleware to create password
userSchema.pre<IUser>("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

// Initialize our User model
const User = model<IUser>("user", userSchema);

export default User;

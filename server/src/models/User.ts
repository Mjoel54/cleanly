import { Schema, Document, model, ObjectId } from "mongoose";
import bcrypt from "bcrypt";

interface IUser extends Document {
  _id: string;
  username: string;
  email: string;
  password: string;
  rooms: ObjectId[];
  createdAt: Date;
  isVerified: boolean;
  timezone: string;
  isCorrectPassword(password: string): Promise<boolean>;
}

// Schema to create User model
const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, "Please provide a name"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      match: [/.+@.+\..+/, "Must match an email address!"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 5,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    timezone: {
      type: String,
      required: [true, "Please provide a timezone"],
      default: "UTC",
      validate: {
        validator: function (v: string) {
          try {
            Intl.DateTimeFormat(undefined, { timeZone: v });
            return true;
          } catch (e) {
            return false;
          }
        },
        message: (props) => `${props.value} is not a valid timezone!`,
      },
    },
    rooms: [
      {
        type: Schema.Types.ObjectId,
        ref: "Room", // Where is this reference coming from?
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
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
    // Password complexity requirements
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(this.password)) {
      throw new Error(
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
      );
    }

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

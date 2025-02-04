// A resolver is a function that resolves the data from the database

import { Room, User } from "../models/index.js";
import { signToken, AuthenticationError } from "../utils/auth.js";

// Define types for the arguments

interface AddUserArgs {
  input: {
    username: string;
    email: string;
    password: string;
  };
}

interface LoginUserArgs {
  email: string;
  password: string;
}

// interface UserArgs {
//   username: string;
// }

interface RoomArgs {
  id: string;
}

interface CreateRoomArgs {
  name: string;
}
interface UpdateRoomArgs {
  id: string;
  name: string;
}

// interface AddRoomArgs {
//   input: {
//     name: string;
//   };
// }

// interface TaskArgs {
//   name: string;
//   description?: string;
// }

// interface AddTaskArgs {
//   input: {
//     name: string;
//     description?: string;
//   };
// }

const resolvers = {
  Query: {
    rooms: async () => {
      try {
        return await Room.find().sort({ createdAt: -1 }).populate("tasks");
      } catch (error) {
        console.error("Error fetching rooms:", error);
        throw new Error("Unable to fetch rooms");
      }
    },
    room: async (_: any, { id }: RoomArgs) => {
      const room = await Room.findById(id);
      if (!room) {
        throw new Error("Room not found");
      }
      return room;
    },
    // Query to get the authenticated user's information
    // The 'me' query relies on the context to check if the user is authenticated
    me: async (_parent: any, _args: any, context: any) => {
      // If the user is authenticated, find and return the user's information along with their thoughts
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("thoughts");
      }
      // If the user is not authenticated, throw an AuthenticationError
      throw new AuthenticationError("Could not authenticate user.");
    },
  },
  Mutation: {
    addUser: async (_parent: any, { input }: AddUserArgs) => {
      // Create a new user with the provided username, email, and password
      const user = await User.create({ ...input });

      // Sign a token with the user's information
      const token = signToken(user.username, user.email, user._id);

      // Return the token and the user
      return { token, user };
    },

    login: async (_parent: any, { email, password }: LoginUserArgs) => {
      // Find a user with the provided email
      const user = await User.findOne({ email });

      // If no user is found, throw an AuthenticationError
      if (!user) {
        throw new AuthenticationError("Could not authenticate user.");
      }

      // Check if the provided password is correct
      const correctPw = await user.isCorrectPassword(password);

      // If the password is incorrect, throw an AuthenticationError
      if (!correctPw) {
        throw new AuthenticationError("Could not authenticate user.");
      }

      // Sign a token with the user's information
      const token = signToken(user.username, user.email, user._id);

      // Return the token and the user
      return { token, user };
    },
    createRoom: async (_: any, { name }: CreateRoomArgs) => {
      const newRoom = new Room({
        name,
        createdAt: new Date().toISOString(),
        tasks: [],
      });

      return await newRoom.save();
    },
    updateRoom: async (_: any, { id, name }: UpdateRoomArgs) => {
      const updatedRoom = await Room.findByIdAndUpdate(
        id,
        { name },
        { new: true }
      );

      if (!updatedRoom) {
        throw new Error("Room not found");
      }

      return updatedRoom;
    },
    deleteRoom: async (_: any, { id }: RoomArgs) => {
      const deletedRoom = await Room.findByIdAndDelete(id);
      if (!deletedRoom) {
        throw new Error("Room not found");
      }
      return deletedRoom;
    },
  },
};

export default resolvers;

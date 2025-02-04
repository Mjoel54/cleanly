// A resolver is a function that resolves the data from the database

import { Room } from "../models/index.js";
// import { signToken, AuthenticationError } from "../utils/auth.js";

// Define types for the arguments

// interface addUserArgs {
//   input: {
//     username: string;
//     email: string;
//     password: string;
//   };
// }

// interface LoginUserArgs {
//   email: string;
//   password: string;
// }

// interface UserArgs {
//   username: string;
// }

// interface RoomArgs {
//   roomId: string;
// }

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
  },
};

export default resolvers;

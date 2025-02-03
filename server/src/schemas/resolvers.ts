import { User, Room, Task } from "../models/index.js";
import { signToken, AuthenticationError } from "../utils/auth.js";

// Define types for the arguments

interface addUserArgs {
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

interface UserArgs {
  username: string;
}

interface RoomArgs {
  roomId: string;
}

interface AddRoomArgs {
  input: {
    name: string;
  };
}

interface TaskArgs {
  name: string;
  description?: string;
}

interface AddTaskArgs {
  input: {
    name: string;
    description?: string;
  };
}

const resolvers = {
  // queries to get rooms
  rooms: async () => {
    return await Room.find().sort({ createdAt: -1 });
  },
  room: async (_parent: any, { roomId }: RoomArgs) => {
    return await Room.findOne({ _id: roomId });
  },
};

export default resolvers;

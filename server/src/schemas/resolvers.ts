// A resolver is a function that resolves the data from the database

import { Room, User, Task } from "../models/index.js";
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

interface TaskInput {
  name?: string;
  description?: string;
  status?: "ACTIVE" | "COMPLETED" | "DELETED";
}

interface CreateTaskArgs {
  roomId: string;
  input: TaskInput;
}

interface UpdateTaskArgs {
  taskId: string;
  input: {
    name?: string;
    description?: string;
    status?: "ACTIVE" | "COMPLETED" | "DELETED";
  };
}

interface DeleteTaskArgs {
  taskId: string;
}

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
      try {
        const room = await Room.findById(id).populate({
          path: "tasks",
          model: "Task",
          select:
            "_id name description status dueDate completedAt createdAt updatedAt", // Select necessary fields
        });

        if (!room) {
          throw new Error("Room not found");
        }

        return room;
      } catch (error) {
        console.error("Error fetching room:", error);
        throw new Error("Unable to fetch room");
      }
    },

    task: async (_: any, { id }: { id: string }) => {
      try {
        const task = await Task.findById(id);
        if (!task) {
          throw new Error("Task not found");
        }
        return task;
      } catch (error) {
        console.error("Error fetching task:", error);
        throw new Error("Unable to fetch task");
      }
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
    createTask: async (_: any, { roomId, input }: CreateTaskArgs) => {
      try {
        // Create and save the task
        const newTask = await Task.create({
          name: input.name || "",
          description: input.description,
          status: input.status,
        });

        // Find the room and update it with the new task ID
        const updatedRoom = await Room.findByIdAndUpdate(
          roomId,
          {
            $push: { tasks: newTask._id }, // Store the ObjectId
          },
          {
            new: true,
            runValidators: true,
          }
        ).populate("tasks"); // Ensure tasks are populated

        if (!updatedRoom) {
          throw new Error("Room not found");
        }

        return updatedRoom;
      } catch (error) {
        throw new Error(`Failed to create task: ${error}`);
      }
    },
    updateTask: async (_: any, { taskId, input }: UpdateTaskArgs) => {
      try {
        // Convert the input status to lowercase to match the schema enum if it exists
        const normalizedInput = {
          ...input,
          ...(input.status && { status: input.status }),
          // If status is being set to completed, set completedAt
          ...(input.status === "COMPLETED" && { completedAt: new Date() }),
          // If status is being changed from completed to something else, clear completedAt
          ...(input.status &&
            input.status !== "COMPLETED" && { completedAt: null }),
        };

        // Find and update the task
        const updatedTask = await Task.findByIdAndUpdate(
          taskId,
          { $set: normalizedInput },
          {
            new: true, // Return the updated document
            runValidators: true, // Run schema validators on update
          }
        );

        // Check if task exists
        if (!updatedTask) {
          throw new Error("Task not found");
        }

        return updatedTask;
      } catch (error) {
        console.error("Error updating task:", error);
        throw new Error(`Failed to update task: ${error}`);
      }
    },
    deleteTask: async (_: any, { taskId }: DeleteTaskArgs) => {
      try {
        // First find and delete the task
        const deletedTask = await Task.findByIdAndDelete(taskId);

        if (!deletedTask) {
          throw new Error("Task not found");
        }

        // Update all rooms that might contain this task ID by pulling it from their tasks array
        await Room.updateMany({ tasks: taskId }, { $pull: { tasks: taskId } });

        return deletedTask;
      } catch (error) {
        console.error("Error deleting task:", error);
        throw new Error(`Failed to delete task: ${error}`);
      }
    },
    deleteAllTasks: async () => {
      try {
        // Remove all tasks
        await Task.deleteMany({});

        // Update all rooms by clearing their tasks array
        await Room.updateMany({}, { $set: { tasks: [] } });

        return true; // Indicate success
      } catch (error) {
        console.error("Error deleting all tasks:", error);
        throw new Error("Failed to delete all tasks");
      }
    },
  },
};

export default resolvers;

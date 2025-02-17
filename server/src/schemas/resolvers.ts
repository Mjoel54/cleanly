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
  name: string;
  description?: string;
  status?: "ACTIVE" | "COMPLETED" | "DELETED";
  dueDate?: number;
  room?: string;
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
    dueDate?: number;
    room?: string;
  };
}

interface DeleteTaskArgs {
  taskId: string;
}

const resolvers = {
  Query: {
    rooms: async (_: any, __: any, context: any) => {
      // Check if user is authenticated
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in to see rooms");
      }

      try {
        const user = await User.findById(context.user._id).populate({
          path: "rooms",
          populate: {
            path: "tasks",
          },
        });

        if (!user) {
          throw new AuthenticationError("User not found");
        }

        return user.rooms || [];
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
        const task = await Task.findById(id).populate("room");
        if (!task) {
          throw new Error("Task not found");
        }
        return task;
      } catch (error) {
        console.error("Error fetching task:", error);
        throw new Error("Unable to fetch task");
      }
    },
    tasks: async () => {
      try {
        const allTasks = await Task.find({})
          .sort({ createdAt: -1 })
          .populate("room"); // Optional: sorts by creation date, newest first

        return allTasks;
      } catch (error) {
        throw new Error(`Failed to fetch tasks: ${error}`);
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
    createRoom: async (_: any, { name }: CreateRoomArgs, context: any) => {
      // Check if user is authenticated
      if (!context.user) {
        throw new AuthenticationError(
          "You need to be logged in to create a room"
        );
      }

      try {
        // Create the new room
        const newRoom = new Room({
          name,
          createdAt: new Date().toISOString(),
          tasks: [],
        });

        // Save the room
        const savedRoom = await newRoom.save();

        // Add the room to the user's rooms array
        await User.findByIdAndUpdate(
          context.user._id,
          { $push: { rooms: savedRoom._id } },
          { new: true }
        );

        return savedRoom;
      } catch (error) {
        console.error("Error creating room:", error);
        throw new Error("Unable to create room");
      }
    },
    updateRoom: async (_: any, { id, name }: UpdateRoomArgs, context: any) => {
      // Check if user is authenticated
      if (!context.user) {
        throw new AuthenticationError(
          "You need to be logged in to update a room"
        );
      }

      try {
        // Find the user and check if they own the room
        const user = await User.findById(context.user._id).populate("rooms");

        if (!user) {
          throw new AuthenticationError("User not found");
        }

        // Check if the room belongs to the user
        const userOwnsRoom = user.rooms.some(
          (room: any) => room._id.toString() === id
        );

        if (!userOwnsRoom) {
          throw new AuthenticationError(
            "You can only update rooms that belong to you"
          );
        }

        // Perform the update
        const updatedRoom = await Room.findByIdAndUpdate(
          id,
          { name },
          { new: true }
        );

        if (!updatedRoom) {
          throw new Error("Room not found");
        }

        return updatedRoom;
      } catch (error) {
        console.error("Error updating room:", error);
        throw new Error("Unable to update room");
      }
    },
    deleteRoom: async (_: any, { id }: RoomArgs, context: any) => {
      // Check if user is authenticated
      if (!context.user) {
        throw new AuthenticationError(
          "You need to be logged in to delete a room"
        );
      }

      try {
        // Find the user and check if they own the room
        const user = await User.findById(context.user._id).populate("rooms");

        if (!user) {
          throw new AuthenticationError("User not found");
        }

        // Check if the room belongs to the user
        const userOwnsRoom = user.rooms.some(
          (room: any) => room._id.toString() === id
        );

        if (!userOwnsRoom) {
          throw new AuthenticationError(
            "You can only delete rooms that belong to you"
          );
        }

        // Find the room to get its tasks
        const room = await Room.findById(id);
        if (!room) {
          throw new Error("Room not found");
        }

        // Delete all associated tasks
        await Task.deleteMany({ _id: { $in: room.tasks } });

        // Delete the room
        const deletedRoom = await Room.findByIdAndDelete(id);

        // Remove the room from the user's rooms array
        await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { rooms: id } },
          { new: true }
        );

        return deletedRoom;
      } catch (error) {
        console.error("Error deleting room:", error);
        throw new Error("Unable to delete room");
      }
    },
    createTask: async (_: any, { roomId, input }: CreateTaskArgs) => {
      try {
        // Create and save the task
        const newTask = await Task.create({
          name: input.name || "",
          description: input.description,
          status: input.status,
          dueDate: input.dueDate,
          room: roomId,
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
    deleteRoomsAndTasks: async () => {
      try {
        // Step 1: Delete all tasks first
        await Task.deleteMany({});

        // Step 2: Delete all rooms
        await Room.deleteMany({});

        return true; // Indicate success
      } catch (error) {
        console.error("Error deleting rooms and tasks:", error);
        throw new Error("Failed to delete rooms and tasks");
      }
    },
  },
};

export default resolvers;

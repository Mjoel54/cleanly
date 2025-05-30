// A resolver is a function that resolves the data from the database

import { Room, User, Task } from "../models/index.js";
import { signToken, AuthenticationError } from "../utils/auth.js";
import bcrypt from "bcrypt";

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
  isCompleted?: boolean;
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
    isCompleted?: boolean;
    dueDate?: number;
    room?: string;
  };
}

interface DeleteTaskArgs {
  taskId: string;
}

interface UpdateUserArgs {
  input: {
    password: string;
    currentPassword: string;
  };
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
      // If the user is authenticated, find and return the user's information
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id });
        if (!user) {
          throw new AuthenticationError("User not found");
        }
        return {
          _id: user._id,
          username: user.username,
          email: user.email,
          rooms: user.rooms,
          createdAt: user.createdAt,
          isVerified: user.isVerified,
        };
      }
      // If the user is not authenticated, throw an AuthenticationError
      throw new AuthenticationError("Could not authenticate user.");
    },
  },
  Mutation: {
    addUser: async (_parent: any, { input }: AddUserArgs) => {
      try {
        // Validate input
        if (!input.username || !input.email || !input.password) {
          throw new Error("All fields are required");
        }

        // Validate password length
        if (input.password.length < 5) {
          throw new Error("Password must be at least 5 characters long");
        }

        // Check if a user with the same email already exists
        const existingUser = await User.findOne({
          $or: [{ email: input.email }, { username: input.username }],
        });

        if (existingUser) {
          throw new Error(
            existingUser.email === input.email
              ? "A user with this email already exists"
              : "This username is already taken"
          );
        }

        // Create a new user with the provided username, email, and password
        const user = await User.create({ ...input });

        // Sign a token with the user's information
        const token = signToken(user.username, user.email, user._id);

        // Create a user object without the password
        const userWithoutPassword = {
          _id: user._id,
          username: user.username,
          email: user.email,
          rooms: user.rooms,
          createdAt: user.createdAt,
          isVerified: user.isVerified,
        };

        // Return the token and the user (without password)
        return { token, user: userWithoutPassword };
      } catch (error) {
        // Handle specific error cases
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("Failed to create user");
      }
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

      // Create a user object without the password
      const userWithoutPassword = {
        _id: user._id,
        username: user.username,
        email: user.email,
        rooms: user.rooms,
        createdAt: user.createdAt,
        isVerified: user.isVerified,
      };

      // Return the token and the user (without password)
      return { token, user: userWithoutPassword };
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
          isCompleted: input.isCompleted,
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
        );

        if (!updatedRoom) {
          throw new Error("Room not found");
        }

        // Return the new task with populated room field
        return await Task.findById(newTask._id).populate("room");
      } catch (error) {
        console.error("Error in createTask:", error);
        throw new Error(`Failed to create task: ${error}`);
      }
    },
    updateTask: async (_: any, { taskId, input }: UpdateTaskArgs) => {
      try {
        const normalizedInput = {
          ...input,
          ...(input.isCompleted && { status: input.isCompleted }),
          // If status is being set to completed, set completedAt
          ...(input.isCompleted === true && { completedAt: new Date() }),
          // If status is being changed from completed to something else, clear completedAt
          ...(input.isCompleted &&
            input.isCompleted !== true && { completedAt: null }),
        };

        // Find the current task to get its current room
        const currentTask = await Task.findById(taskId);
        if (!currentTask) {
          throw new Error("Task not found");
        }

        // If room is being changed
        if (input.room && input.room !== currentTask.room.toString()) {
          // Remove task from old room
          await Room.findByIdAndUpdate(currentTask.room, {
            $pull: { tasks: taskId },
          });

          // Add task to new room
          await Room.findByIdAndUpdate(input.room, {
            $push: { tasks: taskId },
          });
        }

        // Find and update the task
        const updatedTask = await Task.findByIdAndUpdate(
          taskId,
          { $set: normalizedInput },
          {
            new: true, // Return the updated document
            runValidators: true, // Run schema validators on update
          }
        ).populate({
          path: "room",
          select: "_id name description tasks",
          populate: {
            path: "tasks",
            select: "_id name",
          },
        });

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
    updateUser: async (_: any, { input }: UpdateUserArgs, context: any) => {
      // Check if user is authenticated
      if (!context.user) {
        throw new AuthenticationError("Unauthorised");
      }

      try {
        // Find the user
        const user = await User.findById(context.user._id);

        if (!user) {
          throw new AuthenticationError("User not found");
        }

        // Verify current password
        const correctPw = await user.isCorrectPassword(input.currentPassword);
        if (!correctPw) {
          throw new AuthenticationError("Current password is incorrect");
        }

        // Update the password
        user.password = input.password;

        // Save the user - this will trigger the pre-save middleware to hash the password
        const updatedUser = await user.save();

        // Generate a new token
        const token = signToken(
          updatedUser.username,
          updatedUser.email,
          updatedUser._id
        );

        // Return user without sensitive information and the new token
        return {
          token,
          user: {
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            rooms: updatedUser.rooms,
            createdAt: updatedUser.createdAt,
            isVerified: updatedUser.isVerified,
          },
        };
      } catch (error) {
        console.error("Error updating user:", error);
        throw new Error("Unable to update user profile");
      }
    },
    deleteUser: async (
      _: any,
      { password }: { password: string },
      context: any
    ) => {
      if (!context.user) {
        throw new AuthenticationError("Not authenticated");
      }

      const user = await User.findById(context.user._id);
      if (!user) {
        throw new Error("User not found");
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error("Invalid password");
      }

      // Delete all rooms and tasks associated with the user
      await Room.deleteMany({ _id: { $in: user.rooms } });
      await Task.deleteMany({ room: { $in: user.rooms } });

      // Delete the user
      await User.findByIdAndDelete(context.user._id);

      return true;
    },
  },
};

export default resolvers;

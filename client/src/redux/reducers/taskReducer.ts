import { createSlice } from "@reduxjs/toolkit";
import { fetchAllTasks, addTask } from "../actions/taskActions";
import { Room } from "../../interfaces/Room";

export interface TaskItem {
  readonly _id: string;
  name: string;
  description?: string;
  isCompleted?: boolean;
  dueDate: number;
  completedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  room: Room;
}

export interface TaskState {
  items: TaskItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export const initialState: TaskState = {
  items: [],
  status: "idle",
  error: null as string | null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // Any other synchronous reducers you might need
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTasks.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAllTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchAllTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch tasks";
      })
      // Handle addTask cases
      .addCase(addTask.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to create task";
      });
  },
});

export default tasksSlice;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TaskState {}

const initialState: TaskState = {};

export const TaskSlice = createSlice({
  name: "tasks",
  initialState: {
    taskIds: [],
  },
  reducers: {
    addTask: (state, action) => {
      state.taskIds.push(action.payload, ...state.taskIds);
    },
    deleteTask: (state, action) => {
      const indexOfTask = state.taskIds.indexOf(action.payload);
    },
  },
});

export const {} = TaskSlice.actions;

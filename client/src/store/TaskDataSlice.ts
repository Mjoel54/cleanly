import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { GET_TASKS } from "../utils/api/index";
import { client } from "../config/apollo";

export const fetchAllTasks = createAsyncThunk("fetch-all-tasks", async () => {
  const response = await client.query({
    query: GET_TASKS,
  });
  console.log(response.data.tasks);

  return response.data.tasks; // Assuming the tasks are in response.data.tasks
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    loading: false,
    error: null as string | null,
  },
  reducers: {
    // Any other synchronous reducers you might need
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAllTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tasks";
      });
  },
});

export default tasksSlice.reducer;

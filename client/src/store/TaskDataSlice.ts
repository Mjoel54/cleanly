import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET_TASKS } from "../utils/api/index";

const fetchAllTasks = createAsyncThunk("fetch-all-tasks", async () => {
  const response = await GET_TASKS();
  return response.data;
});

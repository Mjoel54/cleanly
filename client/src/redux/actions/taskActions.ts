import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { client } from "../../config/apollo";
import { GET_TASKS } from "../../utils/api/index";

export const fetchAllTasks = createAsyncThunk("fetch-all-tasks", async () => {
  try {
    const response = await client.query({
      query: GET_TASKS,
    });
    console.log(response.data.tasks);

    return response.data.tasks; // Assuming the tasks are in response.data.tasks
  } catch (err: unknown) {
    return isRejectedWithValue(
      err instanceof Error ? err.message : "Error retrieving all tasks"
    );
  }
});

import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { client } from "../../config/apollo";
import { GET_TASKS, CREATE_TASK } from "../../utils/api/index";

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

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async ({
    roomId,
    input,
  }: {
    roomId: string;
    input: { name: string; description?: string };
  }) => {
    try {
      const response = await client.mutate({
        mutation: CREATE_TASK,
        variables: { roomId, input },
        refetchQueries: [{ query: GET_TASKS }],
        awaitRefetchQueries: true,
      });
      return response.data.createTask;
    } catch (err: unknown) {
      return isRejectedWithValue(
        err instanceof Error ? err.message : "Error creating task"
      );
    }
  }
);

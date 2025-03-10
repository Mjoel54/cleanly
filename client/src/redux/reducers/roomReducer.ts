import { TaskResponse } from "../../interfaces/Task";
import { createSlice } from "@reduxjs/toolkit";
import { fetchAllRooms } from "../actions/roomActions";

// Room typing for redux state
export interface RoomItem {
  readonly _id: string;
  name: string;
  description: string;
  tasks: TaskResponse[];
}

export interface RoomState {
  rooms: RoomItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export const initialState: RoomState = {
  rooms: [],
  status: "idle",
  error: null,
};

const roomSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    // Any other synchronous reducers you might need
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRooms.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAllRooms.fulfilled, (state, action) => {
        // console.log("Action payload:", action.payload);
        state.status = "succeeded";
        state.rooms = action.payload; // Use the payload directly
        // console.log("Updated state:", state.rooms);
      })

      .addCase(fetchAllRooms.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch tasks";
      });
  },
});

export default roomSlice;

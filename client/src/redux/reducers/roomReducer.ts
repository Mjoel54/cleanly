import { TaskResponse } from "../../interfaces/Task";
import { createSlice } from "@reduxjs/toolkit";
import { fetchAllRooms, deleteRoom, createRoom } from "../actions/roomActions";

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
  currentRoom?: RoomItem | null;
}

export interface CreateRoomPayload {
  name: string;
}

export const initialState: RoomState = {
  rooms: [],
  status: "idle",
  error: null,
  currentRoom: null,
};

const roomSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    // Any other synchronous reducers you might need
  },
  extraReducers: (builder) => {
    builder
      // Handle fetching all rooms
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
      })

      // Handle createRoom pending state
      .addCase(createRoom.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      // Handle createRoom fulfilled state
      .addCase(createRoom.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.rooms.push(action.payload);
        state.currentRoom = action.payload;
      })
      // Handle createRoom rejected state
      .addCase(createRoom.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to create room";
      })

      // Handle deleting a room
      .addCase(deleteRoom.pending, (state) => {
        // You might choose to set a separate loading state if needed
        state.error = null;
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        // Remove the deleted room from the rooms array
        state.rooms = state.rooms.filter(
          (room) => room._id !== action.payload._id
        );
      })
      .addCase(deleteRoom.rejected, (state, action) => {
        state.error = action.error.message || "Failed to delete room";
      });
  },
});

export default roomSlice;

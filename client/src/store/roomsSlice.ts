import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { client } from "../config/apollo";
import { GET_ROOMS } from "../utils/api/index";
import { initialState } from "../interfaces/Room";

export const fetchAllRooms = createAsyncThunk("rooms/fetchAll", async () => {
  const response = await client.query({
    query: GET_ROOMS,
  });
  // console.log(response);
  return response.data.rooms;
});

const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    // Any other synchronous reducers you might need
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllRooms.fulfilled, (state, action) => {
        // console.log("Action payload:", action.payload);
        state.loading = false;
        state.rooms = action.payload; // Use the payload directly
        // console.log("Updated state:", state.rooms);
      })

      .addCase(fetchAllRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tasks";
      });
  },
});

export default roomsSlice;

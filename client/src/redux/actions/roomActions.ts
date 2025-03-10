import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../config/apollo";
import { GET_ROOMS } from "../../utils/api/index";

export const fetchAllRooms = createAsyncThunk("rooms/fetchAll", async () => {
  const response = await client.query({
    query: GET_ROOMS,
  });
  // console.log(response);
  return response.data.rooms;
});

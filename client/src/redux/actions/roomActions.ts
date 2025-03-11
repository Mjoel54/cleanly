import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../config/apollo";
import { GET_ROOMS, DELETE_ROOM, CREATE_ROOM } from "../../utils/api/index";

export const fetchAllRooms = createAsyncThunk("rooms/fetchAll", async () => {
  const response = await client.query({
    query: GET_ROOMS,
  });
  // console.log(response);
  return response.data.rooms;
});

export const createRoom = createAsyncThunk(
  "rooms/createRoom",
  async (name: string) => {
    const response = await client.mutate({
      mutation: CREATE_ROOM,
      variables: { name },
    });
    // console.log(response);
    return response.data.createRoom;
  }
);

export const deleteRoom = createAsyncThunk(
  "rooms/deleteRoom",
  async (deleteRoomId: string) => {
    const response = await client.mutate({
      mutation: DELETE_ROOM,
      variables: { deleteRoomId },
    });
    // console.log(response);
    return response.data.deleteRoom;
  }
);

import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { client } from "../../config/apollo";
import {
  GET_ROOMS,
  CREATE_ROOM,
  UPDATE_ROOM,
  DELETE_ROOM,
} from "../../utils/api/index";

export const fetchAllRooms = createAsyncThunk("rooms/fetchAll", async () => {
  try {
    const response = await client.query({
      query: GET_ROOMS,
    });
    // console.log(response);
    return response.data.rooms;
  } catch (err: unknown) {
    console.log(err);
    return isRejectedWithValue(
      err instanceof Error ? err.message : "Error retrieving all rooms"
    );
  }
});

export const createRoom = createAsyncThunk(
  "rooms/createRoom",
  async (name: string) => {
    const response = await client.mutate({
      mutation: CREATE_ROOM,
      variables: { name },
    });
    console.log(response);
    return response.data.createRoom;
  }
);

export const updateRoom = createAsyncThunk(
  "rooms/updateRoom",
  async ({ updateRoomId, name }: { updateRoomId: string; name: string }) => {
    try {
      const response = await client.mutate({
        mutation: UPDATE_ROOM,
        variables: { updateRoomId, name },
      });
      return response.data.rooms;
    } catch (err: unknown) {
      console.log(err);
      return isRejectedWithValue(
        err instanceof Error ? err.message : "Error updating room"
      );
    }
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

import { TaskResponse } from "./Task";
export interface RoomRequest {
  name: string;
}

export interface RoomResponse {
  _id: string;
  name: string;
  description: string;
  tasks: TaskResponse[];
}

export interface Room {
  _id: string;
  name: string;
  description: string;
  tasks: TaskResponse[];
}

// Room typing for redux state
export interface RoomItem {
  _id: string;
  name: string;
  description: string;
  tasks: TaskResponse[];
}

export interface RoomState {
  rooms: Room[];
  loading: boolean;
  error: string | null;
}

export const initialState: RoomState = {
  rooms: [],
  loading: false,
  error: null as string | null,
};

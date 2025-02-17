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

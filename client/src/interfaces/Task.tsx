import { Room } from "./Room";

export interface Task {
  _id: string;
  name: string;
  description?: string;
  isCompleted?: boolean;
  dueDate: number;
  completedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  room: Room;
}
export interface TaskResponse {
  _id: string;
  name: string;
  description?: string;
  isCompleted?: boolean;
  dueDate: number;
  completedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  room: Room;
}

export interface TaskRequest {
  roomId: string;
  input: {
    name: string;
    description: string;
    dueDate: number;
    isCompleted?: boolean;
    room?: string;
  };
}

export interface TaskResponse {
  _id: string;
  name: string;
  description?: string;
  status?: "ACTIVE" | "COMPLETED" | "DELETED";
  dueDate: number;
  completedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskRequest {
  roomId: string;
  input: {
    name: string;
    description: string;
    dueDate: number;
  };
}

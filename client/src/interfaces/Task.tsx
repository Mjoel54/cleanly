export interface Task {
  _id: string;
  name: string;
  description: string;
}

export interface TaskRequest {
  roomId: string;
  input: {
    name: string;
    description: string;
    dueDate: string;
  };
}

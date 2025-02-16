import { gql } from "@apollo/client";

export const CREATE_TASK = gql`
  mutation CreateTask($roomId: ID!, $input: TaskInput!) {
    createTask(roomId: $roomId, input: $input) {
      _id
      name
    }
  }
`;

/*
EXAMPLE ARGUMENT:

{  "roomId": "67a66d9e265f23eeeefb15dd",
  "input": {
    "name": "Clean the cupboards",
    "description": "dust and disinfect"
  }
}

*/

export const UPDATE_TASK = gql`
  mutation UpdateTask($taskId: ID!, $input: TaskInput!) {
    updateTask(taskId: $taskId, input: $input) {
      _id
      name
      description
      status
    }
  }
`;

/*
EXAMPLE ARGUMENT:

{  "taskId": "67a67258265f23eeeefb15ec",
  "input": {
    "name": "UPDATED - Clean the cupboards",
    "description": "UPDATED - dust and disinfect"
  }
}

*/

export const DELETE_TASK = gql`
  mutation DeleteTask($taskId: ID!) {
    deleteTask(taskId: $taskId) {
      _id
      name
    }
  }
`;

/*
EXAMPLE ARGUMENT:

{
  "taskId": "67a67258265f23eeeefb15ec"
}

*/

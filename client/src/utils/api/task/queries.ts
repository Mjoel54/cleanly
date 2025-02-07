import { gql } from "@apollo/client";

export const GET_TASK = gql`
  query Task($taskId: ID!) {
    task(id: $taskId) {
      _id
      name
      description
      status
      dueDate
      completedAt
    }
  }
`;

/*
EXAMPLE ARGUMENT:

{
  "taskId": "67a58a4f2a7d03b808c48109"
}

*/

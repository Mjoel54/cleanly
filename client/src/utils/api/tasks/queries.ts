import { gql } from "@apollo/client";

export const GET_TASKS = gql`
  query Tasks {
    tasks {
      _id
      name
      description
      isCompleted
      dueDate
      completedAt
      createdAt
      updatedAt
      room {
        _id
        name
      }
    }
  }
`;

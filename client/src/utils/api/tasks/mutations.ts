import { gql } from "@apollo/client";

export const DELETE_ALL_TASKS = gql`
  mutation Mutation {
    deleteAllTasks
  }
`;

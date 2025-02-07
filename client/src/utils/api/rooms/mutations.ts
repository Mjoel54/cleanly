import { gql } from "@apollo/client";

export const DELETE_ROOMS_AND_TASKS = gql`
  mutation Mutation {
    deleteRoomsAndTasks
  }
`;

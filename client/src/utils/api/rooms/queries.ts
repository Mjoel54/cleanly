import { gql } from "@apollo/client";

export const GET_ROOMS = gql`
  query Rooms {
    rooms {
      _id
      name
      tasks {
        _id
        name
      }
    }
  }
`;

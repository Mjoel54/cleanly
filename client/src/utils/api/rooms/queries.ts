import { gql } from "@apollo/client";

export const GET_ROOMS = gql`
  query GetRooms {
    rooms {
      _id
      name
    }
  }
`;

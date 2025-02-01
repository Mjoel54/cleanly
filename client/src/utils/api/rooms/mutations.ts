// utils/api/rooms/mutations.ts
import { gql } from "@apollo/client";

export const CREATE_ROOM = gql`
  mutation CreateRoom($name: String!) {
    createRoom(name: $name) {
      _id
      name
    }
  }
`;

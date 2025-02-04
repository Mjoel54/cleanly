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

export const GET_ROOM = gql`
  query Room($roomId: ID!) {
    room(id: $roomId) {
      _id
      name
      createdAt
    }
  }
`;

/* Argumentfor the query

{
  "roomId": "67a0038b9449f5e5836a133f"
}

*/

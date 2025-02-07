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

/*

EXAMPLE ARGUMENT:

{
  "name": "Library-TEST"
}

*/

export const UPDATE_ROOM = gql`
  mutation UpdateRoom($updateRoomId: ID!, $name: String!) {
    updateRoom(id: $updateRoomId, name: $name) {
      _id
      name
    }
  }
`;

/*
EXAMPLE ARGUMENT:

{  "updateRoomId": "67a66d9e265f23eeeefb15dd",
  "name": "KITCHEN_UPDATED_TEST"
}

*/

export const DELETE_ROOM = gql`
  mutation DeleteRoom($deleteRoomId: ID!) {
    deleteRoom(id: $deleteRoomId) {
      _id
      name
      tasks {
        _id
      }
    }
  }
`;

/*
EXAMPLE ARGUMENT:

{
  "deleteRoomId": "67a45fb15157c6178176fbad"
}

*/

import { gql } from "@apollo/client";

export const GET_ROOM = gql`
  query Room($roomId: ID!) {
    room(id: $roomId) {
      _id
      name
    }
  }
`;

/*

EXAMPLE ARGUMENT:

{
  "roomId": "67a5871d682a463a023cdd5a"
}

*/

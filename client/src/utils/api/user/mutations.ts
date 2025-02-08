import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation AddUser($input: UserInput!) {
    addUser(input: $input) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

/*
EXAMPLE ARGUMMENT:

{
  "input": {
    "username": "Mjoel54",
    "email": "mitch@hotmail.com",
    "password": "Test4571"
  }
}

*/

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

export const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      _id
      username
      email
      rooms {
        _id
      }
      createdAt
      isVerified
    }
  }
`;

/*
EXAMPLE ARGUMENT:
{
  "input": {
    "password": "NewSecurePassword123!"
  }
}
*/

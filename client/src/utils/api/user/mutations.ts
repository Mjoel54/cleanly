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
      token
      user {
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
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($password: String!) {
    deleteUser(password: $password)
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

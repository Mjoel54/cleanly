import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

/*
EXAMPLE ARGUMMENT:

{  "email": "mitchjoelklein@hotmail.com",
  "password": "mitchjoelklein@hotmail.com"
}

*/

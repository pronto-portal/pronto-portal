import { gql } from "graphql-request";

export const login = gql`
  mutation login(
    $email: String!
    $phone: String
    $firstName: String
    $lastName: String
  ) {
    login(
      input: {
        email: $email
        phone: $phone
        firstName: $firstName
        lastName: $lastName
      }
    ) {
      email
      phone
      firstName
      lastName
      isProfileComplete
    }
  }
`;

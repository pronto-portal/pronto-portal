import { gql } from "graphql-request";

export const updateUser = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      createdAt
      updatedAt
      email
      phone
      firstName
      lastName
      isManager
      isTranslator
      isBanned
      isProfileComplete
      city
      state
      languages
    }
  }
`;

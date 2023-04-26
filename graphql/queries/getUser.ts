import { gql } from "@apollo/client";

export const getUser = gql`
  query GetUser {
    getUser {
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
    }
  }
`;

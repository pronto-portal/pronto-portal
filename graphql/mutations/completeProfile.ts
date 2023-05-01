import { gql } from "@apollo/client";

export const completeProfile = gql`
  mutation UpdateUser($input: CompleteProfileInput!) {
    completeProfile(input: $input) {
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

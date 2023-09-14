import { gql } from "graphql-request";

export const updateClaimant = gql`
  mutation updateClaimant($input: UpdateClaimantInput!) {
    updateClaimant(input: $input) {
      id
      firstName
      lastName
      phone
      email
      languages
      user {
        id
        firstName
        lastName
      }
    }
  }
`;

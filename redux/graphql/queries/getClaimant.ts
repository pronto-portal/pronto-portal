import { gql } from "graphql-request";

export const getClaimant = gql`
  query getClaimant($input: ByIdInput!) {
    getClaimant(input: $input) {
      id
      firstName
      lastName
      email
      phone
    }
  }
`;

import { gql } from "graphql-request";

export const getClaimants = gql`
  query getClaimants($input: PaginatedInput, $where: ClaimantsFilter) {
    getClaimants(input: $input, where: $where) {
      totalRowCount
      claimants {
        id
        firstName
        lastName
        email
        phone
        user {
          id
        }
        primaryLanguage
        languages
      }
    }
  }
`;

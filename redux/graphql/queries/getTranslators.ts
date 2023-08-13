import { gql } from "graphql-request";

export const getTranslators = gql`
  query GetTranslators($input: PaginatedInput!) {
    getTranslators(input: $input) {
      id
      email
      phone
      firstName
      lastName
      languages
    }
  }
`;

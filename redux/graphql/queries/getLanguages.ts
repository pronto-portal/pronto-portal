import { gql } from "graphql-request";

export const getLanguages = gql`
  query GetLanguages {
    getLanguages {
      name
      code
    }
  }
`;

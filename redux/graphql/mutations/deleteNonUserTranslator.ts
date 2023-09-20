import { gql } from "graphql-request";

export const deleteNonUserTranslator = gql`
  mutation deleteNonUserTranslator($input: ByIdInput!) {
    deleteNonUserTranslator(input: $input) {
      id
      email
      phone
      firstName
      lastName
      city
      state
      languages
    }
  }
`;

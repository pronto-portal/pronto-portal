import { gql } from "graphql-request";

export const updateNonUserTranslator = gql`
  mutation updateNonUserTranslator($input: UpdateNonUserTranslatorInput!) {
    updateNonUserTranslator(input: $input) {
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

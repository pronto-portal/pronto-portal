import { gql } from "graphql-request";

export const getNonUserTranslators = gql`
  query GetNonUserTranslators(
    $input: PaginatedInput
    $where: TranslatorsFilter
  ) {
    getNonUserTranslators(input: $input) {
      totalRowCount
      translators {
        id
        email
        phone
        firstName
        lastName
        languages
      }
    }
  }
`;

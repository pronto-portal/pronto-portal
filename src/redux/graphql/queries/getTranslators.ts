import { gql } from 'graphql-request';

export const getTranslators = gql`
    query GetTranslators($input: PaginatedInput, $where: TranslatorsFilter) {
        getTranslators(input: $input, where: $where) {
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

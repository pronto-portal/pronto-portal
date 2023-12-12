import { gql } from 'graphql-request';

export const getReminders = gql`
    query GetReminders($input: PaginatedInput!) {
        getReminders(input: $input) {
            id
            translatorMessage
            claimantMessage
            assignment {
                id
                dateTime
                createdBy {
                    id
                }
            }
            createdBy {
                id
            }
        }
    }
`;

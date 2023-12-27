import { gql } from 'graphql-request';

export const getReminder = gql`
    query GetReminder($input: ByIdInput!) {
        getReminder(input: $input) {
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

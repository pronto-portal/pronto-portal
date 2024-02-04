import { gql } from 'graphql-request';

export const deleteReminder = gql`
    mutation deleteReminder($input: ByIdInput!) {
        deleteReminder(input: $input) {
            id
            translatorMessage
            claimantMessage
            assignment {
                id
                dateTime
                assignedTo {
                    id
                    firstName
                    lastName
                    languages
                }
                claimant {
                    id
                    firstName
                    lastName
                    languages
                }
            }
        }
    }
`;

import { gql } from 'graphql-request';

export const updateReminder = gql`
    mutation updateReminder($input: UpdateReminderInput!) {
        updateReminder(input: $input) {
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

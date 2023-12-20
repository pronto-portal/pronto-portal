import { gql } from 'graphql-request';

export const toggleAssignmentCancellation = gql`
    mutation toggleAssignmentCancellation($input: ByIdInput!) {
        toggleAssignmentCancellation(input: $input) {
            id
            dateTime
            address {
                id
                address1
                address2
                city
                state
                zipCode
            }
            assignedTo {
                id
                firstName
                lastName
            }
            assignedTo {
                id
                firstName
                lastName
            }
            createdBy {
                id
                firstName
                lastName
            }
            claimant {
                id
                firstName
                lastName
            }
            isCancelled
        }
    }
`;

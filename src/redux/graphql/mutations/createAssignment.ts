import { gql } from 'graphql-request';

export const createAssignment = gql`
    mutation createAssignment($input: CreateAssignmentInput!) {
        createAssignment(input: $input) {
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
        }
    }
`;

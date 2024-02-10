import { gql } from 'graphql-request';

export const updateManyAssignments = gql`
    mutation updateManyAssignments($input: UpdateManyAssignmentsInput!) {
        updateManyAssignments(input: $input) {
            count
        }
    }
`;

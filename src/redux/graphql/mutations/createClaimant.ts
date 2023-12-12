import { gql } from 'graphql-request';

export const createClaimant = gql`
    mutation CreateClaimant($input: CreateClaimantInput!) {
        createClaimant(input: $input) {
            id
            firstName
            lastName
            email
            phone
            languages
        }
    }
`;

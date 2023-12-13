import { gql } from 'graphql-request';

export const getNonUserTranslator = gql`
    query GetNonUserTranslator($input: ByIdInput!) {
        getNonUserTranslator(input: $input) {
            id
            email
            phone
            firstName
            lastName
            city
            state
            languages
        }
    }
`;

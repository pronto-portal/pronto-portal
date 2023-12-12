import { gql } from 'graphql-request';

export const getTranslator = gql`
    query GetTranslator($input: ByIdInput!) {
        getTranslator(input: $input) {
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

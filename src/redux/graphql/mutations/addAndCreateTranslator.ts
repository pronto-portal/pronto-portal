import { gql } from 'graphql-request';

export const addAndCreateTranslator = gql`
    mutation AddAndCreateTranslator($input: AddAndCreateTranslatorInput!) {
        addAndCreateTranslator(input: $input) {
            id
            email
            firstName
            lastName
            city
            state
            phone
            languages
            translatingFor {
                firstName
                lastName
                phone
                email
            }
        }
    }
`;

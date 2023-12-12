import { gql } from 'graphql-request';

export const addNonUserTranslator = gql`
    mutation addNonUserTranslator($input: AddNonUserTranslatorInput!) {
        addNonUserTranslator(input: $input) {
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

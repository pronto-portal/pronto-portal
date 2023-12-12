import { gql } from 'graphql-request';

export const updateUser = gql`
    mutation UpdateUser($input: UpdateUserInput!) {
        updateUser(input: $input) {
            id
            email
            updatedAt
            firstName
            lastName
            phone
            languages
            translatingFor {
                id
                firstName
                lastName
                languages
                email
                phone
            }
            translators {
                id
                firstName
                lastName
                languages
                email
                phone
            }
            city
            state
            isTranslator
            isManager
            isProfileComplete
        }
    }
`;

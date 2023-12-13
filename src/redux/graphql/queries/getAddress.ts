import { gql } from 'graphql-request';

export const gerAddress = gql`
    query GetAddress($input: ByIdInput!) {
        getAddress(input: $input) {
            id
            address1
            address2
            city
            state
            zipCode
        }
    }
`;

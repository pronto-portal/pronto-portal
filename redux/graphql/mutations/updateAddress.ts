import { gql } from "graphql-request";

export const updateAddress = gql`
  mutation updateAddress($input: UpdateAddressInput!) {
    updateAddress(input: $input) {
      id
      address1
      address2
      city
      state
      zipCode
      user {
        id
        firstName
        lastName
      }
    }
  }
`;

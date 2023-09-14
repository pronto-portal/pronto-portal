import { gql } from "graphql-request";

export const createAddress = gql`
  mutation CreateAddress($input: CreateAddressInput!) {
    createAddress(input: $input) {
      id
      address1
      address2
      city
      state
      zipCode
    }
  }
`;

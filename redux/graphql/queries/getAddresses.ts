import { gql } from "graphql-request";

export const getAddresses = gql`
  query GetAddresses($input: PaginatedInput, $where: AddressesFilter) {
    getAddresses(input: $input, where: $where) {
      totalRowCount
      addresses {
        id
        address1
        address2
        city
        state
        zipCode
        assignment {
          id
          dateTime
          createdBy {
            id
          }
        }
        user {
          id
        }
      }
    }
  }
`;

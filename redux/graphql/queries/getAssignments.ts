import { gql } from "graphql-request";

export const getAssignments = gql`
  query GetAssignments($input: PaginatedInput!, $where: AssignmentsFilter) {
    getAssignments(input: $input, where: $where) {
      id
      dateTime
      address {
        id
        address1
        address2
        city
        state
        zipCode
      }
      assignedTo {
        id
        firstName
        lastName
      }
      createdBy {
        id
        firstName
        lastName
      }
      claimant {
        id
        firstName
        lastName
      }
    }
  }
`;

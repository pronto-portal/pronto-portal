import { gql } from "graphql-request";

export const getAssignments = gql`
  query GetAssignments($input: PaginatedInput!) {
    getAssignments(input: $input) {
      assignments {
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
          email
          phone
          firstName
          lastName
          city
          state
          languages
        }
        createdBy {
          id
          email
          phone
          firstName
          lastName
          city
          state
          languages
        }
        claimant {
          id
          firstName
          lastName
          email
          phone
          languages
        }
        isComplete
        createdAt
        claimantNoShow
        translatorNoShow
      }
      totalRowCount
    }
  }
`;

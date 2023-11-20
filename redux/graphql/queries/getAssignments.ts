import { gql } from "graphql-request";

export const getAssignments = gql`
  query GetAssignments($input: PaginatedInput, $where: AssignmentsFilter) {
    getAssignments(input: $input, where: $where) {
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
        assignedToUser {
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
          primaryLanguage
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
        isComplete
        createdAt
        claimantNoShow
        translatorNoShow
      }
      totalRowCount
    }
  }
`;

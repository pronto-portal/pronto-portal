import { gql } from "graphql-request";

export const createReminder = gql`
  mutation createReminder($input: CreateReminderInput!) {
    createReminder(input: $input) {
      id
      translatorMessage
      claimantMessage
      assignment {
        id
        dateTime
        assignedTo {
          id
          firstName
          lastName
          languages
        }
        claimant {
          id
          firstName
          lastName
          languages
        }
      }
    }
  }
`;

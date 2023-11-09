import { gql } from "graphql-request";

export const getRoles = gql`
  query GetRoles {
    getRoles {
      name
      description
      features
      stripePriceId
      priceCents
      translatorsLimit
      remindersLimit
    }
  }
`;

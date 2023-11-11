import { gql } from "graphql-request";

export const getUser = gql`
  query GetUser {
    getUser {
      id
      createdAt
      updatedAt
      email
      phone
      firstName
      lastName
      isManager
      isTranslator
      isBanned
      isProfileComplete
      city
      state
      languages
      autoRenewSubscription
      subscriptionEndDate
      translatorsCount
      remindersCount
      role {
        name
        description
        priceCents
        features
        stripePriceId
        remindersLimit
        translatorsLimit
      }
    }
  }
`;

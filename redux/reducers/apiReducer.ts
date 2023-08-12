import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { User } from "../../types/User";
import { completeProfile } from "../graphql/mutations/completeProfile";
import { getCookie } from "cookies-next";
import { getUser } from "../graphql/queries";

export const api = createApi({
  baseQuery: graphqlRequestBaseQuery({
    url: process.env.NEXT_PUBLIC_API_URL!,
    prepareHeaders: (headers) => {
      const token = getCookie("x-access-token");
      if (token) {
        headers.set("Authorization", token.toString());
      }
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    completeProfile: builder.mutation<
      User,
      {
        firstName: string;
        lastName: string;
        phone: string | null;
        isManager: boolean;
        isTranslator: boolean;
        languages: string[];
      }
    >({
      query: (input) => ({
        document: completeProfile,
        variables: {
          input,
        },
      }),
      invalidatesTags: [{ type: "User", id: "CURRENT" }],
    }),
    getUser: builder.query<User, void>({
      query: () => ({
        document: getUser,
      }),
      providesTags: [{ type: "User", id: "CURRENT" }],
    }),
  }),
});

export const { useCompleteProfileMutation, useGetUserQuery } = api;

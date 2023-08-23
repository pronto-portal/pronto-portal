import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { User } from "../../types/User";
import { completeProfile } from "../graphql/mutations/completeProfile";
import { getCookie } from "cookies-next";
import { getUser } from "../graphql/queries";
import {
  GetTranslatorsInput,
  AddAndCreateTranslatorInput,
} from "../../types/inputTypes";
import { getTranslators } from "../graphql/queries/getTranslators";
import {
  AddAndCreateTranslatorResponse,
  GetTranslatorsResponse,
} from "../../types/responseTypes";
import { addAndCreateTranslator } from "../graphql/mutations/addAndCreateTranslator";

export const api = createApi({
  baseQuery: graphqlRequestBaseQuery({
    url: process.env.NEXT_PUBLIC_API_URL!,
    prepareHeaders: (headers) => {
      const token = getCookie("x-access-token");
      if (token) {
        headers.set("authorization", `Bearer ${token.toString()}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Translators"],
  endpoints: (builder) => ({
    completeProfile: builder.mutation<
      { completeProfile: User },
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
      invalidatesTags: [{ type: "User", id: "current" }],
    }),
    getUser: builder.query<{ getUser: User }, void>({
      query: () => ({
        document: getUser,
      }),
      providesTags: [{ type: "User", id: "current" }],
    }),
    getTranslators: builder.query<GetTranslatorsResponse, GetTranslatorsInput>({
      query: (vars) => ({
        document: getTranslators,
        variables: {
          ...vars,
        },
      }),
      providesTags: [{ type: "Translators", id: "current" }],
    }),
    addAndCreateTranslator: builder.mutation<
      AddAndCreateTranslatorResponse,
      AddAndCreateTranslatorInput
    >({
      query: (vars) => ({
        document: addAndCreateTranslator,
        variables: {
          ...vars,
        },
      }),
      invalidatesTags: [{ type: "User", id: "current" }],
    }),
  }),
});

export const {
  useCompleteProfileMutation,
  useGetUserQuery,
  useGetTranslatorsQuery,
  useAddAndCreateTranslatorMutation,
} = api;

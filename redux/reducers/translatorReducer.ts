import { createApi } from "@reduxjs/toolkit/query/react";
import { User } from "../../types/ObjectTypes";
import { completeProfile } from "../graphql/mutations/completeProfile";
import { getUser } from "../graphql/queries";
import {
  GetTranslatorsInput,
  AddAndCreateTranslatorInput,
} from "../../types/InputTypes";
import { getTranslators } from "../graphql/queries/getTranslators";

import { addAndCreateTranslator } from "../graphql/mutations/addAndCreateTranslator";
import { baseQuery } from "../baseQuery";
import {
  AddAndCreateTranslatorResponse,
  GetTranslatorsResponse,
} from "../../types/ResponseTypes/Translator";
import { api } from "./apiReducer";

export const translators = api.injectEndpoints({
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
} = translators;

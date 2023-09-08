import { User } from "../../types/ObjectTypes";
import { completeProfile } from "../graphql/mutations/completeProfile";
import { getUser } from "../graphql/queries";
import {
  GetTranslatorsInput,
  AddAndCreateTranslatorInput,
} from "../../types/InputTypes";
import { getTranslators } from "../graphql/queries/getTranslators";

import { addAndCreateTranslator } from "../graphql/mutations/addAndCreateTranslator";
import {
  AddAndCreateTranslatorResponse,
  GetTranslatorsResponse,
} from "../../types/ResponseTypes/Translator";
import { api } from "./apiReducer";
import { GetTranslatorResponse } from "../../types/ResponseTypes";
import { GetById } from "../../types/InputTypes";

export const translators = api.injectEndpoints({
  endpoints: (builder) => ({
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
    getTranslator: builder.query<GetTranslatorResponse, GetById>({
      query: (variables) => ({
        document: getUser,
        variables: variables,
      }),
      providesTags: [{ type: "Translator", id: "current" }],
    }),
  }),
});

export const {
  useGetTranslatorsQuery,
  useAddAndCreateTranslatorMutation,
  useGetTranslatorQuery,
} = translators;

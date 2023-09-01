import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";
import { getAssignments } from "../graphql/queries/getAssignments";
import { api } from "./apiReducer";
import { createAddress } from "../graphql/mutations/createAddress";

export const addresses = api.injectEndpoints({
  endpoints: (builder) => ({
    createAddress: builder.mutation<any, any>({
      query: (vars) => ({
        document: createAddress,
        variables: {
          ...vars,
        },
      }),
    }),
  }),
});

export const {} = addresses;

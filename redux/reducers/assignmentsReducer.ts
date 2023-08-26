import { createApi } from "@reduxjs/toolkit/query/react";
import { GetAssignmentsInput } from "../../types/inputTypes";
import { GetAssignmentsResponse } from "../../types/responseTypes";
import { baseQuery } from "../baseQuery";
import { getAssignments } from "../graphql/queries/getAssignments";
import { api } from "./apiReducer";

export const assignments = api.injectEndpoints({
  endpoints: (builder) => ({
    getAssignments: builder.query<GetAssignmentsResponse, GetAssignmentsInput>({
      query: (vars) => ({
        document: getAssignments,
        variables: {
          ...vars,
        },
      }),
      providesTags: [{ type: "Assignments", id: "current" }],
    }),
  }),
});

export const { useGetAssignmentsQuery } = assignments;

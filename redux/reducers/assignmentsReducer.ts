import { createApi } from "@reduxjs/toolkit/query/react";
import { GetAssignmentsInput } from "../../types/InputTypes";
import { baseQuery } from "../baseQuery";
import { getAssignments } from "../graphql/queries/getAssignments";
import { api } from "./apiReducer";
import { GetAssignmentsResponse } from "../../types/ResponseTypes";
import { createAssignment } from "../graphql/mutations/createAssignment";
import { CreateAssignmentResponse } from "../../types/ResponseTypes";
import { CreateAssignmentInput } from "../../types/InputTypes";

export const assignments = api.injectEndpoints({
  endpoints: (builder) => ({
    getAssignments: builder.query<GetAssignmentsResponse, GetAssignmentsInput>({
      query: (variables) => ({
        document: getAssignments,
        variables,
      }),
      providesTags: [{ type: "Assignments", id: "current" }],
    }),
    createAssignment: builder.mutation<
      CreateAssignmentResponse,
      CreateAssignmentInput
    >({
      query: (variables) => ({
        document: createAssignment,
        variables,
      }),
      invalidatesTags: [{ type: "Assignments", id: "current" }],
    }),
  }),
});

export const { useGetAssignmentsQuery, useCreateAssignmentMutation } =
  assignments;

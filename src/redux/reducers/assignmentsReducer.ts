import { api } from './apiReducer';
import {
    CreateAssignmentMutation,
    GetAssignmentsQuery,
    MutationUpdateAssignmentArgs,
    UpdateAssignmentMutation,
    GetAssignmentsQueryVariables,
    UpdateManyAssignmentsMutation,
    MutationUpdateManyAssignmentsArgs,
    CreateAssignmentMutationVariables,
} from '../graphql/codegen/types/graphql';
import { createAssignment } from '../graphql/mutations/createAssignment';
import { updateAssignment } from '../graphql/mutations/updateAssignment';
import { updateManyAssignments } from '../graphql/mutations/updateManyAssignments';
import { getAssignments } from '../graphql/queries/getAssignments';

export const assignments = api.injectEndpoints({
    endpoints: (builder) => ({
        getAssignments: builder.query<GetAssignmentsQuery, GetAssignmentsQueryVariables>({
            query: (variables) => ({
                document: getAssignments,
                variables,
            }),
            providesTags: [{ type: 'Assignments', id: 'current' }],
        }),
        createAssignment: builder.mutation<CreateAssignmentMutation, CreateAssignmentMutationVariables>({
            query: (variables) => ({
                document: createAssignment,
                variables,
            }),
            invalidatesTags: [{ type: 'Assignments', id: 'current' }],
        }),
        updateAssignment: builder.mutation<UpdateAssignmentMutation, MutationUpdateAssignmentArgs>({
            query: (variables) => ({
                document: updateAssignment,
                variables,
            }),
            invalidatesTags: [{ type: 'Assignments', id: 'current' }],
        }),
        updateAssignments: builder.mutation<UpdateManyAssignmentsMutation, MutationUpdateManyAssignmentsArgs>({
            query: (variables) => ({
                document: updateManyAssignments,
                variables,
            }),
            invalidatesTags: [{ type: 'Assignments', id: 'current' }],
        }),
    }),
});

export const { useGetAssignmentsQuery, useCreateAssignmentMutation, useUpdateAssignmentMutation } = assignments;

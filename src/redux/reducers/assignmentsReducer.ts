import { api } from './apiReducer';
import { CreateAssignmentInput } from '../../types/InputTypes';
import { UpdateAssignmentInput } from '../../types/InputTypes';
import { GetAssignmentsResponse } from '../../types/ResponseTypes';
import { CreateAssignmentResponse } from '../../types/ResponseTypes';
import { UpdateAssignmentResponse } from '../../types/ResponseTypes';
import {
    ByIdInput,
    GetAssignmentsQueryVariables,
    MutationToggleAssignmentCancellationArgs,
    ToggleAssignmentCancellationMutation,
} from '../graphql/codegen/types/graphql';
import { createAssignment } from '../graphql/mutations/createAssignment';
import { toggleAssignmentCancellation } from '../graphql/mutations/toggleAssignmentCancellation';
import { updateAssignment } from '../graphql/mutations/updateAssignment';
import { getAssignments } from '../graphql/queries/getAssignments';

export const assignments = api.injectEndpoints({
    endpoints: (builder) => ({
        getAssignments: builder.query<GetAssignmentsResponse, GetAssignmentsQueryVariables>({
            query: (variables) => ({
                document: getAssignments,
                variables,
            }),
            providesTags: [{ type: 'Assignments', id: 'current' }],
        }),
        createAssignment: builder.mutation<CreateAssignmentResponse, CreateAssignmentInput>({
            query: (variables) => ({
                document: createAssignment,
                variables,
            }),
            invalidatesTags: [{ type: 'Assignments', id: 'current' }],
        }),
        updateAssignment: builder.mutation<UpdateAssignmentResponse, UpdateAssignmentInput>({
            query: (variables) => ({
                document: updateAssignment,
                variables,
            }),
            invalidatesTags: [{ type: 'Assignments', id: 'current' }],
        }),
        toggleAssignmentCancellation: builder.mutation<
            Pick<ToggleAssignmentCancellationMutation, 'toggleAssignmentCancellation'>,
            MutationToggleAssignmentCancellationArgs
        >({
            query: (variables) => ({
                document: toggleAssignmentCancellation,
                variables,
            }),
            invalidatesTags: [{ type: 'Assignments', id: 'current' }],
        }),
    }),
});

export const { useGetAssignmentsQuery, useCreateAssignmentMutation, useUpdateAssignmentMutation, useToggleAssignmentCancellationMutation } = assignments;

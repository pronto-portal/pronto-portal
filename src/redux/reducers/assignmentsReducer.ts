import { api } from './apiReducer';
import { GetAssignmentsInput } from '../../../types/InputTypes';
import { CreateAssignmentInput } from '../../../types/InputTypes';
import { UpdateAssignmentInput } from '../../../types/InputTypes';
import { GetAssignmentsResponse } from '../../../types/ResponseTypes';
import { CreateAssignmentResponse } from '../../../types/ResponseTypes';
import { UpdateAssignmentResponse } from '../../../types/ResponseTypes';
import { createAssignment } from '../graphql/mutations/createAssignment';
import { updateAssignment } from '../graphql/mutations/updateAssignment';
import { getAssignments } from '../graphql/queries/getAssignments';

export const assignments = api.injectEndpoints({
    endpoints: (builder) => ({
        getAssignments: builder.query<GetAssignmentsResponse, GetAssignmentsInput>({
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
    }),
});

export const { useGetAssignmentsQuery, useCreateAssignmentMutation, useUpdateAssignmentMutation } = assignments;

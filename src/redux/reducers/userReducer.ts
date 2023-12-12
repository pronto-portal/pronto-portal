import { api } from './apiReducer';
import { UpdateUserInput } from '../../../types/InputTypes';
import { GetUserResponse, UpdateUserResponse } from '../../../types/ResponseTypes';
import { completeProfile } from '../graphql/mutations/completeProfile';
import { updateUser } from '../graphql/mutations/updateUser';
import { getUser } from '../graphql/queries';

const userReducer = api.injectEndpoints({
    endpoints: (builder) => ({
        completeProfile: builder.mutation({
            query: (input) => ({
                document: completeProfile,
                variables: {
                    input,
                },
            }),
            invalidatesTags: [{ type: 'User', id: 'current' }],
        }),
        getUser: builder.query<GetUserResponse, {}>({
            query: () => ({
                document: getUser,
            }),
            providesTags: [{ type: 'User', id: 'current' }],
        }),
        updateUser: builder.mutation<UpdateUserResponse, UpdateUserInput>({
            query: (variables) => ({
                document: updateUser,
                variables,
            }),
            invalidatesTags: [
                { type: 'Translators', id: 'current' },
                { type: 'User', id: 'current' },
            ],
        }),
    }),
});

export const { useCompleteProfileMutation, useGetUserQuery, useUpdateUserMutation } = userReducer;

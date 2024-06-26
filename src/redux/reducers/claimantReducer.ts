import { api } from './apiReducer';
import { CreateClaimantsInput, GetClaimantInput, GetClaimantsInput, UpdateClaimantsInput } from '../../types/InputTypes';
import { CreateClaimantResponse, GetClaimantResponse, GetClaimantsResponse, UpdateClaimantResponse } from '../../types/ResponseTypes';
import { createClaimant } from '../graphql/mutations/createClaimant';
import { updateClaimant } from '../graphql/mutations/updateClaimant';
import { getClaimant } from '../graphql/queries/getClaimant';
import { getClaimants } from '../graphql/queries/getClaimants';

export const claimantApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getClaimants: builder.query<GetClaimantsResponse, GetClaimantsInput>({
            query: (input) => ({
                document: getClaimants,
                variables: input,
            }),
            providesTags: [{ type: 'Claimants', id: 'current' }],
        }),
        createClaimant: builder.mutation<CreateClaimantResponse, CreateClaimantsInput>({
            query: (input) => ({
                document: createClaimant,
                variables: input,
            }),
            invalidatesTags: [{ type: 'Claimants', id: 'current' }],
        }),
        editClaiamant: builder.mutation<UpdateClaimantResponse, UpdateClaimantsInput>({
            query: (input) => ({
                document: updateClaimant,
                variables: input,
            }),
            invalidatesTags: [
                { type: 'Claimants', id: 'current' },
                { type: 'Claimant', id: 'current' },
                { type: 'Assignments', id: 'current' },
            ],
        }),
        getClaimant: builder.query<GetClaimantResponse, GetClaimantInput>({
            query: (variables) => {
                return {
                    document: getClaimant,
                    variables,
                };
            },
            providesTags: [{ type: 'Claimant', id: 'current' }],
        }),
    }),
    overrideExisting: false,
});

export const { useGetClaimantsQuery, useCreateClaimantMutation, useEditClaiamantMutation, useGetClaimantQuery } = claimantApi;

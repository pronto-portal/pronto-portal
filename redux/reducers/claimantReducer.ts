import { api } from "./apiReducer";
import { createClaimant } from "../graphql/mutations/createClaimant";
import {
  CreateClaimantsInput,
  GetClaimantsFilter,
} from "../../types/InputTypes";
import {
  GetClaimantResponse,
  GetClaimantsResponse,
} from "../../types/ResponseTypes";
import { getClaimants } from "../graphql/queries/getClaimants";

export const claimantApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getClaimants: builder.query<GetClaimantsResponse, GetClaimantsFilter>({
      query: (input) => ({
        document: getClaimants,
        variables: input,
      }),
      providesTags: ["Claimants"],
    }),
    createClaimant: builder.mutation<GetClaimantResponse, CreateClaimantsInput>(
      {
        query: (input) => ({
          document: createClaimant,
          variables: input,
        }),
        invalidatesTags: ["Claimants"],
      }
    ),
  }),
  overrideExisting: false,
});

export const { useGetClaimantsQuery, useCreateClaimantMutation } = claimantApi;

import { api } from "./apiReducer";
import { createAddress } from "../graphql/mutations/createAddress";
import { CreateAddressInput, GetAddressesInput } from "../../types/InputTypes";
import {
  GetAddressResponse,
  GetAddressesResponse,
} from "../../types/ResponseTypes";
import { getAddresses } from "../graphql/queries/getAddresses";

export const addresses = api.injectEndpoints({
  endpoints: (builder) => ({
    createAddress: builder.mutation<GetAddressResponse, CreateAddressInput>({
      query: (vars) => ({
        document: createAddress,
        variables: {
          ...vars,
        },
      }),
      invalidatesTags: [{ type: "Addresses", id: "current" }],
    }),
    getAddresses: builder.query<GetAddressesResponse, GetAddressesInput>({
      query: (vars) => ({
        document: getAddresses,
        variables: {
          ...vars,
        },
      }),
      providesTags: [{ type: "Addresses", id: "current" }],
    }),
  }),
});

export const { useCreateAddressMutation, useGetAddressesQuery } = addresses;

import { api } from "./apiReducer";
import { createAddress } from "../graphql/mutations/createAddress";
import {
  CreateAddressInput,
  GetAddressesInput,
  GetById,
  UpdateAddressInput,
} from "../../types/InputTypes";
import {
  GetAddressResponse,
  GetAddressesResponse,
  CreateAddressResponse,
  UpdateAddressResponse,
} from "../../types/ResponseTypes";
import { getAddresses } from "../graphql/queries/getAddresses";
import { updateAddress } from "../graphql/mutations/updateAddress";

export const addresses = api.injectEndpoints({
  endpoints: (builder) => ({
    createAddress: builder.mutation<CreateAddressResponse, CreateAddressInput>({
      query: (variables) => ({
        document: createAddress,
        variables,
      }),
      invalidatesTags: [{ type: "Addresses", id: "current" }],
    }),
    getAddress: builder.query<GetAddressResponse, GetById>({
      query: (variables) => ({
        document: getAddresses,
        variables,
      }),
      providesTags: [{ type: "Address", id: "current" }],
    }),
    getAddresses: builder.query<GetAddressesResponse, GetAddressesInput>({
      query: (variables) => ({
        document: getAddresses,
        variables,
      }),
      providesTags: [{ type: "Addresses", id: "current" }],
    }),
    updateAddress: builder.mutation<UpdateAddressResponse, UpdateAddressInput>({
      query: (variables) => ({
        document: updateAddress,
        variables,
      }),
      invalidatesTags: [{ type: "Addresses", id: "current" }],
    }),
  }),
});

export const {
  useCreateAddressMutation,
  useGetAddressesQuery,
  useGetAddressQuery,
  useUpdateAddressMutation,
} = addresses;

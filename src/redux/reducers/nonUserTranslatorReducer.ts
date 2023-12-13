import { api } from './apiReducer';
import {
    UpdateNonUserTranslatorInput,
    DeleteNonUserTranslatorInput,
    AddNonTranslatorUser,
    GetTranslatorsInput,
    GetNonUserTranslatorInput,
    GetById,
} from '../../types/InputTypes';
import {
    AddNonUserTranslatorResponse,
    DeleteNonUserTranslatorResponse,
    GetNonUserTranslatorResponse,
    GetNonUserTranslatorsResponse,
    UpdateNonUserTranslatorResponse,
} from '../../types/ResponseTypes';
import { addNonUserTranslator } from '../graphql/mutations/addNonUserTranslator';
import { deleteNonUserTranslator } from '../graphql/mutations/deleteNonUserTranslator';
import { updateNonUserTranslator } from '../graphql/mutations/updateNonUserTranslator';
import { getNonUserTranslator } from '../graphql/queries/getNonUserTranslator';
import { getNonUserTranslators } from '../graphql/queries/getNonUserTranslators';

export const nonUserTranslatorReducer = api.injectEndpoints({
    endpoints: (builder) => ({
        addNonUserTranslator: builder.mutation<AddNonUserTranslatorResponse, AddNonTranslatorUser>({
            query: (input) => ({
                document: addNonUserTranslator,
                variables: input,
            }),
            invalidatesTags: [{ type: 'NonUserTranslators', id: 'current' }],
        }),
        deleteNonUserTranslator: builder.mutation<DeleteNonUserTranslatorResponse, GetById>({
            query: (input) => ({
                document: deleteNonUserTranslator,
                variables: input,
            }),
            invalidatesTags: [{ type: 'NonUserTranslators', id: 'current' }],
        }),
        getNonUserTranslator: builder.query<GetNonUserTranslatorResponse, GetById>({
            query: (input) => ({
                document: getNonUserTranslator,
                variables: input,
            }),
            providesTags: [{ type: 'NonUserTranslator', id: 'current' }],
        }),
        getNonUserTranslators: builder.query<GetNonUserTranslatorsResponse, GetTranslatorsInput>({
            query: (input) => ({
                document: getNonUserTranslators,
                variables: input,
            }),
            providesTags: [{ type: 'NonUserTranslators', id: 'current' }],
        }),
        updateNonUserTranslator: builder.mutation<UpdateNonUserTranslatorResponse, UpdateNonUserTranslatorInput>({
            query: (input) => ({
                document: updateNonUserTranslator,
                variables: input,
            }),
            invalidatesTags: [
                { type: 'NonUserTranslators', id: 'current' },
                { type: 'NonUserTranslator', id: 'current' },
            ],
        }),
    }),
});

export const {
    useAddNonUserTranslatorMutation,
    useDeleteNonUserTranslatorMutation,
    useGetNonUserTranslatorQuery,
    useGetNonUserTranslatorsQuery,
    useUpdateNonUserTranslatorMutation,
} = nonUserTranslatorReducer;

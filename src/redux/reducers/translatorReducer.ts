import { api } from './apiReducer';
import { GetTranslatorsInput, AddAndCreateTranslatorInput } from '../../types/InputTypes';
import { GetById } from '../../types/InputTypes';
import { GetTranslatorResponse } from '../../types/ResponseTypes';
import { AddAndCreateTranslatorResponse, GetTranslatorsResponse } from '../../types/ResponseTypes/Translator';
import { addAndCreateTranslator } from '../graphql/mutations/addAndCreateTranslator';
import { getTranslator } from '../graphql/queries/getTranslator';
import { getTranslators } from '../graphql/queries/getTranslators';

export const translators = api.injectEndpoints({
    endpoints: (builder) => ({
        getTranslators: builder.query<GetTranslatorsResponse, GetTranslatorsInput>({
            query: (vars) => ({
                document: getTranslators,
                variables: {
                    ...vars,
                },
            }),
            providesTags: [{ type: 'Translators', id: 'current' }],
        }),
        addAndCreateTranslator: builder.mutation<AddAndCreateTranslatorResponse, AddAndCreateTranslatorInput>({
            query: (vars) => ({
                document: addAndCreateTranslator,
                variables: {
                    ...vars,
                },
            }),
            invalidatesTags: [{ type: 'User', id: 'current' }],
        }),
        getTranslator: builder.query<GetTranslatorResponse, GetById>({
            query: (variables) => ({
                document: getTranslator,
                variables: variables,
            }),
            providesTags: [{ type: 'Translator', id: 'current' }],
        }),
    }),
});

export const { useGetTranslatorsQuery, useAddAndCreateTranslatorMutation, useGetTranslatorQuery } = translators;

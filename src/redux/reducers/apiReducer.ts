import { createApi } from '@reduxjs/toolkit/query/react';
import { GetLanguagesResponse } from '../../types/ResponseTypes/Language';
import { baseQuery } from '../baseQuery';
import { getLanguages } from '../graphql/queries/getLanguages';

export const api = createApi({
    baseQuery: baseQuery(),
    tagTypes: [
        'User',
        'NonUserTranslator',
        'NonUserTranslators',
        'Translator',
        'Translators',
        'Assignment',
        'Assignments',
        'Address',
        'Addresses',
        'Claimant',
        'Claimants',
        'Reminder',
        'Reminders',
        'Languages',
        'Roles',
        'Role',
    ],
    endpoints: (builder) => ({
        languages: builder.query<GetLanguagesResponse, {}>({
            query: () => ({
                document: getLanguages,
            }),
            providesTags: [{ type: 'Languages', id: 'current' }],
        }),
    }),
});

export const { useLanguagesQuery } = api;

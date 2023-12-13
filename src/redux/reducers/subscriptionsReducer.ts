import { api } from './apiReducer';
import { GetRoles } from '../../types/ResponseTypes';
import { getRoles } from '../graphql/queries/getRoles';

export const subscriptions = api.injectEndpoints({
    endpoints: (builder) => ({
        getRoles: builder.query<GetRoles, {}>({
            query: () => ({
                document: getRoles,
            }),
            providesTags: [{ type: 'Roles', id: 'current' }],
        }),
    }),
});

export const { useGetRolesQuery } = subscriptions;

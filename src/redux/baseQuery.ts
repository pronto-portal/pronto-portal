import { GraphQLClient, ClientError } from 'graphql-request';
import setAuthHeaders from '../utils/setAuthHeaders';

const prepareHeaders = () => {
    const headers = new Headers();
    const preparedHeaders = setAuthHeaders();

    console.log('PREPARED HEADERS', preparedHeaders);
    Object.entries(preparedHeaders).forEach(([key, value]) => {
        headers.set(key, value);
    });

    return headers;
};

const client = new GraphQLClient(process.env.NEXT_PUBLIC_API_URL! + '/graphql', {
    credentials: 'include',
    mode: 'cors',
});

export const baseQuery =
    () =>
    async ({ document, variables = {} }: { document: string; variables?: Record<string, any> }) => {
        console.log('DOCUMENT', document);
        console.log('VARIABLES', variables);

        try {
            const result = await client.request(document, variables, prepareHeaders());
            return { data: result };
        } catch (error) {
            if (error instanceof ClientError) {
                return { error: { status: error.response.status, data: error } };
            }
            return { error: { status: 500, data: error } };
        }
    };

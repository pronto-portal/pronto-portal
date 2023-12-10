import extractJsonObjectFromString from "../utils/extractJsonObjectFromString";
import setAuthHeaders from "../utils/setAuthHeaders";
import { GraphQLClient, ClientError } from "graphql-request";

const prepareHeaders = () => {
  const headers = new Headers();
  const preparedHeaders = setAuthHeaders();

  console.log("PREPARED HEADERS", preparedHeaders);
  Object.entries(preparedHeaders).forEach(([key, value]) => {
    headers.set(key, value);
  });

  return headers;
};

const client = new GraphQLClient(
  process.env.NEXT_PUBLIC_API_URL! + "/graphql",
  {
    credentials: "include",
    mode: "cors",
  }
);

export const baseQuery =
  () =>
  async ({
    document,
    variables = {},
  }: {
    document: string;
    variables?: Record<string, any>;
  }) => {
    try {
      const result = await client.request(
        document,
        variables,
        prepareHeaders()
      );
      return { data: result };
    } catch (error) {
      const errorStr = String(error);
      const errorObj = extractJsonObjectFromString(errorStr);

      if (errorObj instanceof ClientError) {
        return { error: { status: errorObj.response.status, data: errorObj } };
      }
      return { error: { status: 500, data: errorObj } };
    }
  };

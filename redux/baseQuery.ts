import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import setAuthHeaders from "../utils/setAuthHeaders";

const prepareHeaders = (headers: Headers) => {
  const preparedHeaders = setAuthHeaders();
  Object.entries(preparedHeaders).forEach(([key, value]) => {
    headers.set(key, value);
  });

  return headers;
};

export const baseQuery = graphqlRequestBaseQuery({
  url: process.env.NEXT_PUBLIC_API_URL! + "/graphql",
  prepareHeaders,
});

import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { getCookie } from "cookies-next";

export const baseQuery = graphqlRequestBaseQuery({
  url: process.env.NEXT_PUBLIC_API_URL!,
  prepareHeaders: (headers) => {
    const token = getCookie("x-access-token");
    if (token) {
      headers.set("authorization", `Bearer ${token.toString()}`);
    }
    return headers;
  },
});

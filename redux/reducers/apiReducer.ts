import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";

export const api = createApi({
  baseQuery,
  tagTypes: [
    "User",
    "Translators",
    "Assignments",
    "Addresses",
    "Claimants",
    "Reminders",
  ],
  endpoints: () => ({}),
});

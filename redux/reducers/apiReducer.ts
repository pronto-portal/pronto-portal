import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";

export const api = createApi({
  baseQuery,
  tagTypes: [
    "User",
    "NonUserTranslator",
    "NonUserTranslators",
    "Translator",
    "Translators",
    "Assignment",
    "Assignments",
    "Address",
    "Addresses",
    "Claimant",
    "Claimants",
    "Reminder",
    "Reminders",
  ],
  endpoints: () => ({}),
});

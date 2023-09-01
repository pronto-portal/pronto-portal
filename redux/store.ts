import { configureStore } from "@reduxjs/toolkit";
import { api } from "./reducers";
import { createWrapper } from "next-redux-wrapper";
import { assignments } from "./reducers/assignmentsReducer";

export const makeStore = () =>
  configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });

export const wrapper = createWrapper(makeStore, { debug: true });

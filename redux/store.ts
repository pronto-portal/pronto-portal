import { configureStore } from "@reduxjs/toolkit";
import { api } from "./reducers/apiReducer";
import { createWrapper } from "next-redux-wrapper";

export const makeStore = () =>
  configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });

export const wrapper = createWrapper(makeStore, { debug: true });

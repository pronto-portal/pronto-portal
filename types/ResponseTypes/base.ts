import { SerializedError } from "@reduxjs/toolkit";
import { ErrorResponse } from "@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes";

export interface TotalRowCount {
  totalRowCount: number;
}

export interface ResponseData<T> {
  data?: T | null;
}

export interface ResponseError {
  error: ErrorResponse | SerializedError;
}

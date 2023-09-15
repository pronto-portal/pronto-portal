import React, { useState } from "react";

export interface PaginationState {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  countPerPage: number;
  setCountPerPage: React.Dispatch<React.SetStateAction<number>>;
}

export const usePaginationState = (defaultCountPerPage?: number) => {
  const [page, setPage] = useState<number>(0);
  const [countPerPage, setCountPerPage] = useState<number>(
    defaultCountPerPage || 0
  );

  return { page, setPage, countPerPage, setCountPerPage };
};

import { useState } from "react";

export const usePaginationState = (defaultCountPerPage?: number) => {
  const [page, setPage] = useState<number>(0);
  const [countPerPage, setCountPerPage] = useState<number>(
    defaultCountPerPage || 0
  );

  return { page, setPage, countPerPage, setCountPerPage };
};

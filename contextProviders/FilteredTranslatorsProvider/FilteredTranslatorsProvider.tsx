import React, { createContext, useState, useContext } from "react";
import { Wrapper } from "../../types/Wrapper";
import { User } from "../../types/User";
import { useGetTranslatorsQuery } from "../../redux/reducers/apiReducer";
import { GetTranslators } from "../../types/responseTypes";
import { GetTranslatorsFilters } from "../../types/inputTypes";
import { usePaginationState } from "../../hooks/usePaginationState";

interface FilteredTranslatorsContextProps extends GetTranslators {
  filters: GetTranslatorsFilters;
  setFilters: React.Dispatch<React.SetStateAction<GetTranslatorsFilters>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  countPerPage: number;
  setCountPerPage: React.Dispatch<React.SetStateAction<number>>;
  isLoading?: boolean;
  error?: unknown;
}

const FilteredTranslatorsContext = createContext(
  {} as FilteredTranslatorsContextProps
);

export const FilteredTranslatorsProvider: React.FC<Wrapper> = ({
  children,
}) => {
  const [filters, setFilters] = useState<GetTranslatorsFilters>({});
  const { page, setPage, countPerPage, setCountPerPage } =
    usePaginationState(20);

  const { data, isLoading, error } = useGetTranslatorsQuery(
    {
      input: {
        page,
        countPerPage,
      },

      where: filters,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const translators = data ? data.getTranslators.translators : [];
  const totalRowCount = data ? data.getTranslators.totalRowCount : 0;

  return (
    <FilteredTranslatorsContext.Provider
      value={{
        filters,
        setFilters,
        page,
        setPage,
        countPerPage,
        setCountPerPage,
        isLoading,
        error,
        translators,
        totalRowCount,
      }}
    >
      {children}
    </FilteredTranslatorsContext.Provider>
  );
};

export const useFilteredTranslators = () => {
  const data = useContext(FilteredTranslatorsContext);

  if (!data)
    throw new Error(
      "useFilteredTranslators must be used within a FilteredTranslatorsProvider component"
    );

  return data;
};

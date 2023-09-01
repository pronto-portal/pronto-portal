import React, { createContext, useState, useContext } from "react";
import { Wrapper } from "../../types/Wrapper";
import { User } from "../../types/ObjectTypes";
import { useGetTranslatorsQuery } from "../../redux/reducers";
import { GetTranslators } from "../../types/ResponseTypes";
import { GetTranslatorsFilters } from "../../types/InputTypes";
import { usePaginationState } from "../../hooks/usePaginationState";
import { FilteredObjects } from "../../types/FilteredObjectsType";

type FilteredTranslatorsContextProps = FilteredObjects<
  GetTranslatorsFilters,
  GetTranslators
>;

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

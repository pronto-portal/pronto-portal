import React, { createContext, useState, useContext } from "react";
import { Wrapper } from "../../types/PropTypes/Wrapper";
import { User } from "../../types/ObjectTypes";
import { useGetTranslatorsQuery } from "../../redux/reducers";
import {
  GetNonUserTranslators,
  GetTranslators,
} from "../../types/ResponseTypes";
import { GetTranslatorsFilters } from "../../types/InputTypes";
import { usePaginationState } from "../../hooks/usePaginationState";
import { FilteredObjects } from "../../types/FilteredObjectsType";
import { useGetNonUserTranslatorsQuery } from "../../redux/reducers/nonUserTranslatorReducer";

type FilteredTranslatorsContextProps = FilteredObjects<
  GetTranslatorsFilters,
  GetNonUserTranslators
> & {
  filtersOpen: boolean;
  setFiltersOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const FilteredTranslatorsContext = createContext(
  {} as FilteredTranslatorsContextProps
);

export const FilteredTranslatorsProvider: React.FC<Wrapper> = ({
  children,
}) => {
  const [filters, setFilters] = useState<GetTranslatorsFilters>({});
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);
  const { page, setPage, countPerPage, setCountPerPage } =
    usePaginationState(20);

  const { data, isLoading, error } = useGetNonUserTranslatorsQuery(
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

  const translators = data ? data.getNonUserTranslators.translators : [];
  const totalRowCount = data ? data.getNonUserTranslators.totalRowCount : 0;

  return (
    <FilteredTranslatorsContext.Provider
      value={{
        filters,
        setFilters,
        filtersOpen,
        setFiltersOpen,
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

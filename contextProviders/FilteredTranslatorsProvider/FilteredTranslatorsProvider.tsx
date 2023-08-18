import React, { createContext, useState, useContext } from "react";
import { Wrapper } from "../../types/Wrapper";
import { User } from "../../types/User";
import { useGetTranslatorsQuery } from "../../redux/reducers/apiReducer";
import { GetTranslators } from "../../types/responseTypes";

interface FilteredTranslatorsContextProps extends GetTranslators {
  filter: string | undefined;
  setFilter: React.Dispatch<React.SetStateAction<string | undefined>>;
  filterValue: string | undefined;
  setFilterValue: React.Dispatch<React.SetStateAction<string | undefined>>;
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
  const [filter, setFilter] = useState<string>();
  const [filterValue, setFilterValue] = useState<string>();
  const [page, setPage] = useState<number>(0);
  const [countPerPage, setCountPerPage] = useState<number>(20);

  const { data, isLoading, error } = useGetTranslatorsQuery(
    {
      input: {
        page,
        countPerPage,
      },
      ...(filter
        ? {
            where: {
              [filter]: filterValue,
            },
          }
        : {}),
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
        filter,
        setFilter,
        filterValue,
        setFilterValue,
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

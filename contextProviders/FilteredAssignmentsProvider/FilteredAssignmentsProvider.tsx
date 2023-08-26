import React, { createContext, useContext, useState } from "react";
import { GetAssignmentsFilter } from "../../types/inputTypes";
import { GetAssignments } from "../../types/responseTypes";
import { Wrapper } from "../../types/Wrapper";
import { usePaginationState } from "../../hooks/usePaginationState";
import { useGetAssignmentsQuery } from "../../redux/reducers/assignmentsReducer";

interface FilteredAssignmentsContextProps extends GetAssignments {
  filters: GetAssignmentsFilter;
  setFilters: React.Dispatch<React.SetStateAction<GetAssignmentsFilter>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  countPerPage: number;
  setCountPerPage: React.Dispatch<React.SetStateAction<number>>;
  isLoading?: boolean;
  error?: unknown;
}

const FilteredAssignmentsContext = createContext(
  {} as FilteredAssignmentsContextProps
);

export const FilteredAssignmentsProvider: React.FC<Wrapper> = ({
  children,
}) => {
  const [filters, setFilters] = useState<GetAssignmentsFilter>({});
  const { page, setPage, countPerPage, setCountPerPage } =
    usePaginationState(20);

  const { data, isLoading, error } = useGetAssignmentsQuery(
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

  const assignments = data ? data.getAssignments.assignments : [];
  const totalRowCount = data ? data.getAssignments.totalRowCount : 0;

  return (
    <FilteredAssignmentsContext.Provider
      value={{
        filters,
        setFilters,
        page,
        setPage,
        countPerPage,
        setCountPerPage,
        isLoading,
        error,
        assignments,
        totalRowCount,
      }}
    >
      {children}
    </FilteredAssignmentsContext.Provider>
  );
};

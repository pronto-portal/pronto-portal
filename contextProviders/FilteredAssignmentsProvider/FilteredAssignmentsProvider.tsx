import React, { createContext, useContext, useState } from "react";
import { GetAssignmentsFilter } from "../../types/InputTypes";
import { GetAssignments } from "../../types/ResponseTypes";
import { Wrapper } from "../../types/PropTypes/Wrapper";
import { usePaginationState } from "../../hooks/usePaginationState";
import { useGetAssignmentsQuery } from "../../redux/reducers/assignmentsReducer";
import { FilteredObjects } from "../../types/FilteredObjectsType";
import { CustomPageSuspense } from "../../components/CustomPageSuspense";

type FilteredAssignmentsContextProps = FilteredObjects<
  GetAssignmentsFilter,
  GetAssignments
>;

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

      ...(Object.keys(filters).length ? { where: filters } : {}),
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
      <CustomPageSuspense isLoading={isLoading}>{children}</CustomPageSuspense>
    </FilteredAssignmentsContext.Provider>
  );
};

export const useFilteredAssignments = () => {
  const data = useContext(FilteredAssignmentsContext);

  if (!data)
    throw new Error(
      "useFilteredAssignments must be used within a FilteredAssignmentsProvider component"
    );

  return data;
};

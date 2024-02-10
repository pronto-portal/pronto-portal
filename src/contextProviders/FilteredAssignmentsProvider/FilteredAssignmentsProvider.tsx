import React, { createContext, useContext, useState } from 'react';
import { usePaginationState } from '../../hooks/usePaginationState';
import { GetAssignmentsResponse, AssignmentsFilter } from '../../redux/graphql/codegen/types/graphql';
import { useGetAssignmentsQuery } from '../../redux/reducers/assignmentsReducer';
import { FilteredObjects } from '../../types/FilteredObjectsType';
import { Wrapper } from '../../types/PropTypes/Wrapper';

export type FilteredAssignmentsContextProps = FilteredObjects<AssignmentsFilter, GetAssignmentsResponse> & {
    filtersOpen: boolean;
    setFiltersOpen: React.Dispatch<React.SetStateAction<boolean>>;
    totalRowCount: number;
};

const FilteredAssignmentsContext = createContext({} as FilteredAssignmentsContextProps);

export const FilteredAssignmentsProvider: React.FC<Wrapper> = ({ children }) => {
    const [filters, setFilters] = useState<AssignmentsFilter>({});
    const [filtersOpen, setFiltersOpen] = useState<boolean>(false);
    const { page, setPage, countPerPage, setCountPerPage } = usePaginationState(20);

    const { data, isLoading, error } = useGetAssignmentsQuery(
        {
            input: {
                page,
                countPerPage,
            },

            ...(filters && Object.keys(filters).length ? { where: filters } : {}),
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
                filtersOpen,
                setFiltersOpen,
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

export const useFilteredAssignments = (): FilteredAssignmentsContextProps => {
    const data = useContext(FilteredAssignmentsContext);

    if (!data) throw new Error('useFilteredAssignments must be used within a FilteredAssignmentsProvider component');

    return data;
};

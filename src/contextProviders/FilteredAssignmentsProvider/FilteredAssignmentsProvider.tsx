import React, { createContext, useContext, useState } from 'react';
import { usePaginationState } from '../../hooks/usePaginationState';
import { useGetAssignmentsQuery } from '../../redux/reducers/assignmentsReducer';
import { FilteredObjects } from '../../types/FilteredObjectsType';
import { GetAssignmentsFilter } from '../../types/InputTypes';
import { Wrapper } from '../../types/PropTypes/Wrapper';
import { GetAssignments } from '../../types/ResponseTypes';

type FilteredAssignmentsContextProps = FilteredObjects<GetAssignmentsFilter, GetAssignments> & {
    filtersOpen: boolean;
    setFiltersOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const FilteredAssignmentsContext = createContext({} as FilteredAssignmentsContextProps);

export const FilteredAssignmentsProvider: React.FC<Wrapper> = ({ children }) => {
    const [filters, setFilters] = useState<GetAssignmentsFilter>({});
    const [filtersOpen, setFiltersOpen] = useState<boolean>(false);
    const { page, setPage, countPerPage, setCountPerPage } = usePaginationState(20);

    console.log(filters);
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

export const useFilteredAssignments = () => {
    const data = useContext(FilteredAssignmentsContext);

    if (!data) throw new Error('useFilteredAssignments must be used within a FilteredAssignmentsProvider component');

    return data;
};

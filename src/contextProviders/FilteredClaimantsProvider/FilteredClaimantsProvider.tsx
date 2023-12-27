import React, { createContext, useState, useContext } from 'react';
import { usePaginationState } from '../../hooks/usePaginationState';
import { useGetClaimantsQuery } from '../../redux/reducers';
import { FilteredObjects } from '../../types/FilteredObjectsType';
import { GetClaimantsFilter } from '../../types/InputTypes';
import { Wrapper } from '../../types/PropTypes/Wrapper';
import { GetClaimants } from '../../types/ResponseTypes';

type FilteredClaimantsContextProps = FilteredObjects<GetClaimantsFilter, GetClaimants>;

const FilteredClaimantsContext = createContext({} as FilteredClaimantsContextProps);

export const FilteredClaimantsProvider: React.FC<Wrapper> = ({ children }) => {
    const [filters, setFilters] = useState<GetClaimantsFilter>({});
    const { page, setPage, countPerPage, setCountPerPage } = usePaginationState(20);

    const { data, isLoading, error } = useGetClaimantsQuery(
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

    const claimants = data ? data.getClaimants.claimants : [];
    const totalRowCount = data ? data.getClaimants.totalRowCount : 0;

    return (
        <FilteredClaimantsContext.Provider
            value={{
                filters,
                setFilters,
                page,
                setPage,
                countPerPage,
                setCountPerPage,
                isLoading,
                error,
                claimants,
                totalRowCount,
            }}
        >
            {children}
        </FilteredClaimantsContext.Provider>
    );
};

export const useFilteredClaimants = () => {
    const data = useContext(FilteredClaimantsContext);

    if (!data) throw new Error('useFilteredClaimants must be used within a FilteredClaimantsProvider component');

    return data;
};

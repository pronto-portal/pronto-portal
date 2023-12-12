import { PaginationState } from '../hooks/usePaginationState';

type BaseFilteredObjects<FiltersType> = {
    filters: FiltersType;
    setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
    isLoading?: boolean;
    error?: unknown;
} & PaginationState;

export type FilteredObjects<FiltersType, ExtendType> = BaseFilteredObjects<FiltersType> & ExtendType;

type BaseFilteredObjects<FiltersType> = {
  filters: FiltersType;
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  countPerPage: number;
  setCountPerPage: React.Dispatch<React.SetStateAction<number>>;
  isLoading?: boolean;
  error?: unknown;
};

export type FilteredObjects<FiltersType, ExtendType> =
  BaseFilteredObjects<FiltersType> & ExtendType;

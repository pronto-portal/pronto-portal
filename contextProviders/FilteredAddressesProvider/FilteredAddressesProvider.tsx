import React, { createContext, useContext, useState } from "react";
import { Address } from "../../types/ObjectTypes";
import { GetAddressesFilter } from "../../types/InputTypes";
import { useGetAddressesQuery } from "../../redux/reducers";
import { usePaginationState } from "../../hooks/usePaginationState";
import { FilteredObjects } from "../../types/FilteredObjectsType";
import { Wrapper } from "../../types/PropTypes/Wrapper";
import { GetAddresses } from "../../types/ResponseTypes";

type FilteredAddressesContextProps = FilteredObjects<
  GetAddressesFilter,
  GetAddresses
>;

const FilteredAddressesContext = createContext<FilteredAddressesContextProps>(
  {} as FilteredAddressesContextProps
);

export const FilteredAddressesProvider: React.FC<Wrapper> = ({ children }) => {
  const [filters, setFilters] = useState<GetAddressesFilter>({});
  const { page, setPage, countPerPage, setCountPerPage } = usePaginationState();
  const { data } = useGetAddressesQuery({});

  return (
    <FilteredAddressesContext.Provider
      value={{
        addresses: data ? data.getAddresses.addresses : [],
        totalRowCount: data ? data.getAddresses.totalRowCount : 0,
        filters,
        setFilters,
        page,
        setPage,
        countPerPage,
        setCountPerPage,
      }}
    >
      {children}
    </FilteredAddressesContext.Provider>
  );
};

export const useFilteredAddresses = () => {
  const data = useContext(FilteredAddressesContext);

  if (!data)
    throw new Error(
      "useFilteredAddresses must be used within FilteredAddressesProvider"
    );

  return data;
};

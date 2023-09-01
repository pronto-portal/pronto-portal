import React, { createContext, useContext, useState } from "react";
import { Address } from "../../types/ObjectTypes";
import { GetAddressesFilter } from "../../types/InputTypes";

interface FilteredAddressesProviderProps {
  children: React.ReactNode;
}

interface FilteredAddressesContextProps {
  addresses: Address[];
  setAddresses: React.Dispatch<React.SetStateAction<Address[]>>;
  filters: GetAddressesFilter;
  setFilters: React.Dispatch<React.SetStateAction<GetAddressesFilter>>;
}

const FilteredAddressesContext = createContext<FilteredAddressesContextProps>(
  {} as FilteredAddressesContextProps
);

export const FilteredAddressesProvider = ({
  children,
}: FilteredAddressesProviderProps) => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [filters, setFilters] = useState<GetAddressesFilter>({});

  return (
    <FilteredAddressesContext.Provider
      value={{ addresses, setAddresses, filters, setFilters }}
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

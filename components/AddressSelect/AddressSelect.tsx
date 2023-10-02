import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useGetAddressesQuery } from "../../redux/reducers";
import { Address } from "../../types/ObjectTypes";

interface AddressSelectProps {
  onChange: (address: Address) => void;
}

export const AddressSelect: React.FC<AddressSelectProps> = ({ onChange }) => {
  const { data } = useGetAddressesQuery({});

  return (
    <Autocomplete
      options={data ? data.getAddresses.addresses : []}
      getOptionLabel={(option) =>
        `${option.address1}, ${option.address2 ? option.address2 + "," : ""} ${
          option.city
        }, ${option.state}, ${option.zipCode}`
      }
      fullWidth
      onChange={(_, newValue) => {
        if (newValue) {
          onChange(newValue);
        }
      }}
      renderInput={(params) => (
        <TextField {...params} label="Address" variant="outlined" fullWidth />
      )}
    />
  );
};

import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useGetClaimantsQuery } from "../../redux/reducers";
import { Claimant } from "../../types/ObjectTypes";
import { UserInfoAutocompleteOption } from "../UserInfoAutocompleteOption";

interface ClaimantSelectProps {
  onChange: (Claimant: Claimant) => void;
}

export const ClaimantSelect: React.FC<ClaimantSelectProps> = ({ onChange }) => {
  const { data } = useGetClaimantsQuery({});

  return (
    <Autocomplete
      options={data?.getClaimants?.claimants || []}
      getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
      fullWidth
      renderOption={(props, option) => (
        <li {...props} key={option.id}>
          <UserInfoAutocompleteOption option={option} />
        </li>
      )}
      onChange={(_, newValue) => {
        if (newValue) {
          onChange(newValue);
        }
      }}
      renderInput={(params) => (
        <TextField {...params} label="Claimants" variant="outlined" fullWidth />
      )}
    />
  );
};

import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useGetClaimantsQuery } from "../../redux/reducers";
import { Claimant } from "../../types/ObjectTypes";
import { UserInfoAutocompleteOption } from "../UserInfoAutocompleteOption";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

interface ClaimantSelectProps {
  onChange?: (claimant: Claimant) => void;
  onConfirm?: (claimant: Claimant) => void;
  enableForm?: boolean;
  defaultValue?: Claimant;
}

const defaultOnChange: (claimant: Claimant) => void = (
  claimant = {} as Claimant
) => {};

export const ClaimantSelect: React.FC<ClaimantSelectProps> = ({
  onChange = defaultOnChange,
  onConfirm = defaultOnChange,
  enableForm = false,
  defaultValue,
}) => {
  const { data } = useGetClaimantsQuery({});
  const [claimant, setClaimant] = useState<Claimant>();

  return (
    <Stack
      width="100%"
      height="100%"
      direction="column"
      alignItems="center"
      spacing={2}
      p={2}
    >
      <Autocomplete
        {...(defaultValue ? { defaultValue } : {})}
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
            if (enableForm) setClaimant(newValue);
            else onChange(newValue);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Claimants"
            variant="outlined"
            fullWidth
          />
        )}
      />
      {enableForm ? (
        <Button
          onClick={() => {
            if (claimant) onConfirm(claimant);
          }}
          variant="contained"
          disabled={!claimant}
        >
          Confirm
        </Button>
      ) : null}
    </Stack>
  );
};

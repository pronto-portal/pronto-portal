import React from "react";
import { Claimant } from "../../types/ObjectTypes";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import {
  useGetAddressesQuery,
  useGetAssignmentsQuery,
} from "../../redux/reducers";
import Autocomplete from "@mui/material/Autocomplete";
import { AddressOption } from "../AddressOption";
import LinearProgress from "@mui/material/LinearProgress";
import { UserInfoAutocompleteOption } from "../UserInfoAutocompleteOption";

interface ClaimantFilterProps {
  onChange(data: Claimant): void;
  defaultValue?: Partial<Claimant>;
}

export const ClaimantFilter: React.FC<ClaimantFilterProps> = ({
  onChange: onClaimantChange,
  defaultValue: { firstName, lastName, email, phone, id } = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    id: "",
  },
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ data: Claimant }>({
    defaultValues: {
      data: {
        firstName,
        lastName,
        email,
        phone,
        id,
      } as Claimant,
    },
  });

  const { data, isLoading } = useGetAssignmentsQuery({});
  const assignments = data?.getAssignments.assignments || [];
  const claimants = assignments
    .map((assignment) => assignment.claimant)
    .filter(
      (claimant) => claimant !== undefined && claimant !== null
    ) as Claimant[];

  const onFormSubmit = handleSubmit(({ data }) => onClaimantChange(data));

  return isLoading ? (
    <LinearProgress sx={{ width: "100%" }} />
  ) : (
    <form onSubmit={onFormSubmit}>
      <Controller
        name="data"
        control={control}
        render={({ field: { onChange, ref, value } }) => (
          <Autocomplete
            ref={ref}
            value={value}
            onChange={(e, data) => {
              onChange(data);
              if (data) onClaimantChange(data);
            }}
            options={claimants}
            getOptionLabel={(option) =>
              `${option.firstName} ${option.lastName}`
            }
            renderOption={(props, option) => (
              <li {...props}>
                <UserInfoAutocompleteOption option={option} />
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Claimant"
                variant="outlined"
                error={!!errors.data}
                helperText={errors.data?.message}
              />
            )}
          />
        )}
      />
    </form>
  );
};

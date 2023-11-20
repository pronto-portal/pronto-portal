import React from "react";
import { Translator } from "../../types/ObjectTypes";
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

interface AssignedToFilterProps {
  onChange(data: Translator): void;
  defaultValue?: Partial<Translator>;
}

export const AssignedToFilter: React.FC<AssignedToFilterProps> = ({
  onChange: onAssignedTohange,
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
  } = useForm<{ data: Translator }>({
    defaultValues: {
      data: {
        firstName,
        lastName,
        email,
        phone,
        id,
      } as Translator,
    },
  });

  const { data, isLoading } = useGetAssignmentsQuery({});
  const assignments = data?.getAssignments.assignments || [];
  const translators = assignments
    .map((assignment) => assignment.assignedTo)
    .filter(
      (translator) => translator !== undefined && translator !== null
    ) as Translator[];

  const onFormSubmit = handleSubmit(({ data }) => onAssignedTohange(data));

  return isLoading ? (
    <LinearProgress sx={{ width: "100%" }} />
  ) : (
    <form onSubmit={onFormSubmit}>
      <Controller
        name="data"
        control={control}
        render={({ field: { onChange, ref, value } }) => {
          return (
            <Autocomplete
              ref={ref}
              value={value}
              onChange={(e, data) => {
                onChange(data);
                if (data) onAssignedTohange(data);
              }}
              options={translators}
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
                  label="Assigned To"
                  variant="outlined"
                  error={!!errors.data}
                  helperText={errors.data?.message}
                />
              )}
            />
          );
        }}
      />
    </form>
  );
};

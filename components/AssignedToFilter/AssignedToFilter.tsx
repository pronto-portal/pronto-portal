import React, { useEffect } from "react";
import { Person, Translator } from "../../types/ObjectTypes";
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
import { ResponsiveForm } from "../ResponsiveForm";

interface AssignedToFilterProps {
  onChange(data: Partial<Translator>): void;
  defaultValue?: Partial<Translator>;
  value?: Partial<Translator>;
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
  value,
}) => {
  console.log("default", { firstName, lastName, email, phone, id });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<{ data: Partial<Translator> }>({
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

  useEffect(() => {
    setValue(
      "data",
      value || {
        firstName,
        lastName,
        email,
        phone,
        id,
      }
    );
  }, [value, firstName, lastName, email, phone, id, setValue]);

  const { data, isLoading } = useGetAssignmentsQuery({});
  const assignments = data?.getAssignments.assignments || [];
  const translators = assignments
    .map((assignment) => assignment.assignedTo)
    .filter(
      (translator) => translator !== undefined && translator !== null
    ) as Translator[];

  const onFormSubmit = handleSubmit(({ data }) => {
    if (data) onAssignedTohange(data);
  });

  return isLoading ? (
    <LinearProgress sx={{ width: "100%" }} />
  ) : (
    <ResponsiveForm
      onSubmit={onFormSubmit}
      sx={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Controller
        name="data"
        control={control}
        render={({ field: { onChange, ref, value } }) => {
          return (
            <Autocomplete
              ref={ref}
              value={value}
              fullWidth
              onChange={(e, data) => {
                onChange(data);
                console.log(data);
                if (data) onAssignedTohange(data);
              }}
              options={translators}
              getOptionLabel={(option) =>
                `${option.firstName} ${option.lastName}`
              }
              renderOption={(props, option) =>
                option ? (
                  <li {...props}>
                    <UserInfoAutocompleteOption option={option as Person} />
                  </li>
                ) : null
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
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
    </ResponsiveForm>
  );
};

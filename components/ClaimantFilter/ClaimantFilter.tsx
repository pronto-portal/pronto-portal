import React, { useEffect } from "react";
import { Claimant, Person } from "../../types/ObjectTypes";
import { useForm, Controller } from "react-hook-form";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useGetAssignmentsQuery } from "../../redux/reducers";
import Autocomplete from "@mui/material/Autocomplete";
import LinearProgress from "@mui/material/LinearProgress";
import { UserInfoAutocompleteOption } from "../UserInfoAutocompleteOption";
import { ResponsiveForm } from "../ResponsiveForm";

interface ClaimantFilterProps {
  onChange(data: Partial<Claimant>): void;
  defaultValue?: Partial<Claimant>;
  value?: Partial<Claimant>;
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
  value,
}) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<{ data: Partial<Claimant> }>({
    defaultValues: {
      data: {
        firstName,
        lastName,
        email,
        phone,
        id,
      } as Partial<Claimant>,
    },
  });

  useEffect(() => {
    setValue(
      "data",
      value ||
        ({
          firstName,
          lastName,
          email,
          phone,
          id,
        } as Partial<Claimant>)
    );
  }, [firstName, lastName, email, phone, id, setValue, value]);

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
        render={({ field: { onChange, ref, value } }) => (
          <Autocomplete
            ref={ref}
            value={value}
            fullWidth
            onChange={(_, data) => {
              onChange(data);
              if (data) onClaimantChange(data);
            }}
            options={claimants}
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
                label="Claimant"
                variant="outlined"
                error={!!errors.data}
                helperText={errors.data?.message}
              />
            )}
          />
        )}
      />
    </ResponsiveForm>
  );
};

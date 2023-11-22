import React, { useEffect } from "react";
import { Address } from "../../types/ObjectTypes";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useGetAddressesQuery } from "../../redux/reducers";
import Autocomplete from "@mui/material/Autocomplete";
import { AddressOption } from "../AddressOption";
import LinearProgress from "@mui/material/LinearProgress";
import { ResponsiveForm } from "../ResponsiveForm";

interface AddressFilterProps {
  onChange(data: Partial<Address>): void;
  defaultValue?: Partial<Address>;
  value?: Partial<Address>;
}

export const AddressFilter: React.FC<AddressFilterProps> = ({
  onChange: onAddressChange,
  defaultValue: { address1, address2, city, state, zipCode } = {
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  value,
}) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<{ data: Partial<Address> }>({
    defaultValues: {
      data: {
        address1,
        address2,
        city,
        state,
        zipCode,
      },
    },
  });

  useEffect(() => {
    setValue(
      "data",
      value || {
        address1,
        address2,
        city,
        state,
        zipCode,
      }
    );
  }, [address1, address2, city, state, zipCode, value, setValue]);

  const { data, isLoading } = useGetAddressesQuery({});
  const addresses =
    data && data.getAddresses ? data.getAddresses.addresses : ([] as Address[]);

  const onFormSubmit: SubmitHandler<{ data: Partial<Address> }> = ({
    data,
  }) => {
    if (data) onAddressChange(data);
  };
  return isLoading ? (
    <LinearProgress sx={{ width: "100%" }} />
  ) : (
    <ResponsiveForm onSubmit={handleSubmit(onFormSubmit)}>
      <Stack height="100%" flex={1} alignItems="center" justifyContent="center">
        <Controller
          name="data"
          control={control}
          render={({ field: { onChange, ref, value } }) => (
            <Autocomplete
              ref={ref}
              value={value}
              fullWidth
              onChange={(e, data) => {
                onChange(data);
                if (data) onAddressChange(data);
              }}
              options={addresses}
              getOptionLabel={(option) => option.address1 || ""}
              renderOption={(props, option) => (
                <li {...props}>
                  <AddressOption address={option} />
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Address"
                  variant="outlined"
                  error={!!errors.data}
                  fullWidth
                  helperText={errors.data?.message}
                />
              )}
            />
          )}
        />
      </Stack>
    </ResponsiveForm>
  );
};

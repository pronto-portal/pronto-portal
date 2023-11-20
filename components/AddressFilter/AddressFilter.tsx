import React from "react";
import { Address } from "../../types/ObjectTypes";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useGetAddressesQuery } from "../../redux/reducers";
import Autocomplete from "@mui/material/Autocomplete";
import { AddressOption } from "../AddressOption";
import LinearProgress from "@mui/material/LinearProgress";

interface AddressFilterProps {
  onChange(data: Address): void;
  defaultValue?: Partial<Address>;
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
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ data: Address }>({
    defaultValues: {
      data: {
        address1,
        address2,
        city,
        state,
        zipCode,
      } as Address,
    },
  });

  const { data, isLoading } = useGetAddressesQuery({});
  const addresses =
    data && data.getAddresses ? data.getAddresses.addresses : ([] as Address[]);

  const onFormSubmit: SubmitHandler<{ data: Address }> = ({ data }) =>
    onAddressChange(data);
  return isLoading ? (
    <LinearProgress sx={{ width: "100%" }} />
  ) : (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <Stack spacing={2}>
        <Controller
          name="data"
          control={control}
          render={({ field: { onChange, ref, value } }) => (
            <Autocomplete
              ref={ref}
              value={value}
              onChange={(e, data) => {
                onChange(data);
                if (data) onAddressChange(data);
              }}
              options={addresses}
              getOptionLabel={(option) => option.address1}
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
                  helperText={errors.data?.message}
                />
              )}
            />
          )}
        />
      </Stack>
    </form>
  );
};

import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import GoogleMaps from "../GoogleMapsAutoComplete/GoogleMapsAutoComplete";
import geocodeByAddress from "../../utils/geocodeByAddress";
import Autocomplete from "@mui/material/Autocomplete";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Address } from "../../types/ObjectTypes";
import {
  useCreateAddressMutation,
  useGetAddressesQuery,
} from "../../redux/reducers";
import { GetAddressResponse } from "../../types/ResponseTypes";
import { ResponseData, ResponseError } from "../../types/ResponseTypes/base";
import { useSnackbar } from "notistack";
import CircularProgress from "@mui/material/CircularProgress";
import { useAddAssignmentFlow } from "../../contextProviders/AddAssignmentFlowProvider";
import { AssignmentFlowForm } from "../../types/PropTypes/AssignmentFlowForm";

interface AddressFormState {
  apt: string;
}

export const AddressForm: React.FC<AssignmentFlowForm> = ({ onSuccess }) => {
  const { control, handleSubmit, setValue } = useForm<AddressFormState>({
    defaultValues: {
      apt: "",
    },
  });

  const [googleAddress, setGoogleAddress] = useState<string>("");
  const { data } = useGetAddressesQuery({});
  const [createAddress, { isLoading }] = useCreateAddressMutation();
  const { enqueueSnackbar } = useSnackbar();
  const { address, setAddress } = useAddAssignmentFlow();

  const onSubmit: SubmitHandler<AddressFormState> = async (submitData) => {
    if (googleAddress) {
      const results = await geocodeByAddress(googleAddress);
      const address = results[0].address_components;
      const streetNumber = address.find((item) =>
        item.types.includes("street_number")
      );
      const streetName = address.find((item) => item.types.includes("route"));
      const city = address.find((item) => item.types.includes("locality"));
      const state = address.find((item) =>
        item.types.includes("administrative_area_level_1")
      );
      const zipCode = address.find((item) =>
        item.types.includes("postal_code")
      );
      // const country = address.find((item) => item.types.includes("country"));
      const address1 = `${streetNumber?.long_name} ${streetName?.long_name}`;

      if (address1 && city && state && zipCode) {
        const addressData = {
          address1: address1,
          address2: submitData.apt,
          city: city.long_name,
          state: state.short_name,
          zipCode: zipCode.long_name,
        };

        console.log(addressData);

        createAddress({ input: addressData }).then((res) => {
          const { data } = res as ResponseData<GetAddressResponse>;

          if (data) {
            enqueueSnackbar("Address created successfully", {
              variant: "success",
            });
            setAddress(data.getAddress);
            onSuccess();
          } else {
            const { error } = res as ResponseError;
            enqueueSnackbar(error.message, { variant: "error" });
          }
        });
      }
    }
  };

  const addressExists = !!Object.keys(address).length;

  const handleOnSelectExistingAddress = () => {
    if (addressExists) {
      onSuccess();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} direction="column" alignItems="center">
          <Grid item xs={1}>
            <Typography>Create a new address</Typography>
          </Grid>
          <Grid item xs={2}>
            <GoogleMaps
              value={googleAddress}
              onChange={(newVal: string) => {
                setGoogleAddress(newVal);
              }}
            />
          </Grid>
          <Grid item xs={2} sx={{ width: "100%" }}>
            <Controller
              name="apt"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Apt/Suite"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={2}>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <Button type="submit" variant="contained">
                Add and Select
              </Button>
            )}
          </Grid>
          <Grid xs={1} item sx={{ width: "100%" }}>
            <Divider />
          </Grid>
          <Grid item xs={1}>
            <Typography>Or select an existing address</Typography>
          </Grid>
          <Grid item xs={2} sx={{ width: "100%" }}>
            <Autocomplete
              options={data ? data.getAddresses.addresses : []}
              getOptionLabel={(option) =>
                `${option.address1}, ${
                  option.address2 ? option.address2 + "," : ""
                } ${option.city}, ${option.state}, ${option.zipCode}`
              }
              onChange={(_, newValue) => {
                if (newValue) {
                  setAddress(newValue);
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Address"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              onClick={handleOnSelectExistingAddress}
              variant="contained"
              disabled={isLoading || !addressExists}
            >
              Select
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

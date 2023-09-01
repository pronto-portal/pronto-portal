import React, { use, useState } from "react";
import { StepperFormBaseProps } from "../../types/StepperFormBaseProps";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import GoogleMaps from "../GoogleMapsAutoComplete/GoogleMapsAutoComplete";
import geocodeByAddress from "../../utils/geocodeByAddress";
import Autocomplete from "@mui/material/Autocomplete";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useFilteredAddresses } from "../../contextProviders/FilteredAddressesProvider";
import { Address } from "../../types/ObjectTypes";

interface AddressFormProps extends StepperFormBaseProps {}
interface AddressFormState {
  apt: string;
}

export const AddressForm: React.FC<AddressFormProps> = ({ onSuccess }) => {
  const { control, handleSubmit, setValue } = useForm<AddressFormState>({
    defaultValues: {
      apt: "",
    },
  });

  const [googleAddress, setGoogleAddress] = useState<string>("");
  const { addresses } = useFilteredAddresses();
  const [selectedAddress, setSelectedAddress] = useState<Address>(
    {} as Address
  );

  const onSubmit: SubmitHandler<AddressFormState> = async (data) => {
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
      const country = address.find((item) => item.types.includes("country"));
      const address1 = `${streetNumber?.long_name} ${streetName?.long_name}`;
      const address2 = `${city?.long_name}, ${state?.short_name} ${zipCode?.long_name}`;
      const addressData = {
        address1: address1,
        address2: address2,
        city: city?.long_name,
        state: state?.short_name,
        zipCode: zipCode?.long_name,
        country: country?.long_name,
      };

      console.log(addressData);
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
                  label="Apt"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={2}>
            <Button type="submit" variant="contained">
              Add and Select
            </Button>
          </Grid>
          <Grid xs={1} item sx={{ width: "100%" }}>
            <Divider />
          </Grid>
          <Grid item xs={1}>
            <Typography>Or select an existing address</Typography>
          </Grid>
          <Grid item xs={2} sx={{ width: "100%" }}>
            <Autocomplete
              options={addresses}
              getOptionLabel={(option) =>
                `${option.address1}, ${option.address2}, ${option.city}, ${option.state}, ${option.zipCode}`
              }
              onChange={(_, newValue) => {
                if (newValue) {
                  setSelectedAddress(newValue);
                  setValue("apt", newValue.address2 || "");
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
            <Button type="submit" variant="contained">
              Select
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

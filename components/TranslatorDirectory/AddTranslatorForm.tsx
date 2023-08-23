import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { useSelectCityState } from "../../hooks/useSelectCityState";
import { useLanguages } from "../../contextProviders/LanguagesProvider";
import { User } from "../../types/User";

interface AddTranslatorFormProps {
  open: boolean;
  handleClose: () => void;
}

export const AddTranslatorForm: React.FC<AddTranslatorFormProps> = ({
  open,
  handleClose,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      city: "",
      state: "",
      email: "",
      phone: "",
      languages: [],
    },
  });

  const { cities, stateISOCodes, city, setCity, state, setState } =
    useSelectCityState();

  const { languages } = useLanguages();

  const submit: SubmitHandler<Partial<User>> = (data) => {};

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Typography textAlign="center">Add Translator</Typography>
      </DialogTitle>

      <DialogContent>
        <form onSubmit={handleSubmit(submit)}>
          <Grid container direction="column" width="100%">
            <Grid item>
              <Controller
                name="firstName"
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="First Name"
                    error={!!errors.firstName}
                    helperText={
                      !!errors.firstName ? "First Name required" : " "
                    }
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                name="lastName"
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Last Name"
                    error={!!errors.lastName}
                    helperText={!!errors.lastName ? "Last Name required" : " "}
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                name="email"
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Email"
                    error={!!errors.email}
                    helperText={!!errors.email ? "Email required" : " "}
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                name="phone"
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Phone"
                    fullWidth
                    error={!!errors.phone}
                    helperText={!!errors.phone ? "Phone required" : " "}
                  />
                )}
              />
            </Grid>
            <Grid
              item
              sx={{
                display: "flex",
                direction: "row",
                gap: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Controller
                name="state"
                rules={{ required: false }}
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    value={state}
                    defaultValue={state}
                    sx={{ flex: 1 }}
                    options={stateISOCodes}
                    autoHighlight
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="State *"
                        inputProps={{ ...params.inputProps, maxLength: 10 }}
                        helperText=" "
                      />
                    )}
                    onChange={(e, newValue) => {
                      setState(newValue ?? "");
                      field.onChange(e);
                    }}
                  />
                )}
              />
              <Controller
                name="city"
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    value={city}
                    sx={{ flex: 1 }}
                    defaultValue={city}
                    disabled={!state}
                    options={cities}
                    autoHighlight
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="City *"
                        inputProps={{ ...params.inputProps, maxLength: 85 }}
                        helperText=" "
                      />
                    )}
                    onChange={(e, newValue) => {
                      setCity(newValue ?? "");
                      field.onChange(e);
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                name="languages"
                rules={{ required: false }}
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    multiple
                    sx={{ flex: 1, width: "100%" }}
                    options={languages}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        label="Languages"
                        helperText=" "
                      />
                    )}
                  />
                )}
              />
            </Grid>
            <Grid
              item
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

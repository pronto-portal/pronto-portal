import React from "react";
import { Claimant } from "../../types/ObjectTypes";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { AssignmentFlowForm } from "../../types/PropTypes/AssignmentFlowForm";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useLanguages } from "../../contextProviders/LanguagesProvider";
import Autocomplete from "@mui/material/Autocomplete";
import { validateEmail } from "../../utils/validateEmail";
import {
  useCreateClaimantMutation,
  useGetClaimantsQuery,
} from "../../redux/reducers/claimantReducer";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useAddAssignmentFlow } from "../../contextProviders/AddAssignmentFlowProvider";
import { useSnackbar } from "notistack";
import Button from "@mui/material/Button";
import { ResponseError } from "../../types/ResponseTypes/base";
import CircularProgress from "@mui/material/CircularProgress";
import phone from "phone";
import { UserInfoAutocompleteOption } from "../UserInfoAutocompleteOption";

type ClaimantFormState = Omit<Claimant, "user" | "id">;

export const ClaimantForm: React.FC<AssignmentFlowForm> = ({ onSuccess }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ClaimantFormState>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      languages: [],
    },
  });

  const { languages } = useLanguages();

  const { data } = useGetClaimantsQuery({});
  const [createClaimant, { isLoading }] = useCreateClaimantMutation();
  const { claimant, setClaimant } = useAddAssignmentFlow();

  const { enqueueSnackbar } = useSnackbar();

  const claimantExists = !!Object.keys(claimant).length;

  const onSubmit: SubmitHandler<ClaimantFormState> = (data) => {
    console.log(errors);

    createClaimant({ input: data })
      .unwrap()
      .then((res) => {
        setClaimant(res.getClaimant);
        enqueueSnackbar("Claimant created", { variant: "success" });
        onSuccess();
      })
      .catch(({ error }: ResponseError) => {
        enqueueSnackbar(error.message, { variant: "error" });
      });
  };

  const handleOnSelectExistingClaimant = () => {
    if (claimantExists) {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        spacing={1}
        direction="column"
        alignItems="center"
        alignContent="center"
      >
        <Grid item sx={{ width: "100%" }} xs={1}>
          <Typography textAlign="center">Create a new claimant</Typography>
        </Grid>
        <Grid
          item
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "flex-start",
            direction: "row",
            rowGap: 2,
            columnGap: 2,
          }}
          xs={2}
        >
          <Controller
            name="firstName"
            rules={{ required: "First name is required" }}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="First Name"
                variant="outlined"
                helperText={errors.firstName?.message || " "}
                error={!!errors.firstName?.message}
                fullWidth
              />
            )}
          />

          <Controller
            name="lastName"
            rules={{ required: "Last name is required" }}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Last Name"
                variant="outlined"
                helperText={errors.lastName?.message || " "}
                error={!!errors.lastName?.message}
                fullWidth
              />
            )}
          />
        </Grid>

        <Grid
          item
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "flex-start",
            direction: "row",
            rowGap: 2,
            columnGap: 2,
          }}
          xs={2}
        >
          <Controller
            name="email"
            rules={{
              required: "Email is required",
              validate: (value) => {
                if (!validateEmail(value)) return "Email is invalid";

                return true;
              },
            }}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                variant="outlined"
                helperText={errors.email?.message || " "}
                error={!!errors.email?.message}
                fullWidth
              />
            )}
          />

          <Controller
            name="phone"
            rules={{
              required: "Phone is required",
              validate: (value) => {
                if (!phone(value).isValid) return "Phone is invalid";

                return true;
              },
            }}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Phone"
                variant="outlined"
                helperText={errors.phone?.message || " "}
                error={!!errors.phone?.message}
                onChange={(e) => {
                  const phoneNumber = phone(e.target.value);
                  field.onChange(phoneNumber.phoneNumber || e.target.value);
                }}
                fullWidth
              />
            )}
          />
        </Grid>

        <Grid item sx={{ width: "100%" }} xs={2}>
          <Controller
            name="languages"
            rules={{
              required: "Languages are required",
              validate: (value) => value.length > 0,
            }}
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                multiple
                options={languages}
                onChange={(_, newValue) => {
                  if (newValue) {
                    field.onChange(newValue);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Languages"
                    variant="outlined"
                    helperText={errors.languages?.message || " "}
                    error={!!errors.languages?.message}
                    fullWidth
                  />
                )}
              />
            )}
          />
        </Grid>
        <Grid item alignContent="center" xs={1}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Button type="submit" variant="contained">
              Add and select claimant
            </Button>
          )}
        </Grid>
        <Grid item sx={{ width: "100%" }} xs={2}>
          <Divider sx={{ paddingBottom: 1 }} />
        </Grid>
        <Grid item sx={{ width: "100%" }} xs={1}>
          <Typography textAlign="center">
            Or select an existing claimant
          </Typography>
        </Grid>

        <Grid item sx={{ width: "100%" }} xs={1}>
          <Autocomplete
            options={data?.getClaimants?.claimants || []}
            getOptionLabel={(option) =>
              `${option.firstName} ${option.lastName}`
            }
            onChange={(_, newValue) => {
              if (newValue) {
                setClaimant(newValue);
              }
            }}
            renderOption={(props, option) => (
              <li {...props}>
                <UserInfoAutocompleteOption option={option} />
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Claimants"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            onClick={handleOnSelectExistingClaimant}
            disabled={isLoading || !claimantExists}
            variant="contained"
          >
            Select claimant
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

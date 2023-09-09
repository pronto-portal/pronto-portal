import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { useSelectCityState } from "../../hooks/useSelectCityState";
import { useLanguages } from "../../contextProviders/LanguagesProvider";
import { User } from "../../types/ObjectTypes";
import {
  useAddAndCreateTranslatorMutation,
  useGetTranslatorQuery,
  useUpdateUserMutation,
} from "../../redux/reducers";
import phone from "phone";
import { useSnackbar } from "notistack";
import { ResponsiveForm } from "../ResponsiveForm/ResponsiveForm";
import { ModelForm } from "../../types/PropTypes/AssignmentFlowForm";
import { FlexRowGridItem } from "../FlexRowGridItem";
import { firstCharToUpper } from "../../utils/firstCharToUpper";
import { validateEmail } from "../../utils/validateEmail";
import CircularProgress from "@mui/material/CircularProgress";

export const AddEditTranslatorForm: React.FC<ModelForm<User>> = ({
  id = "",
  onSuccess,
  mode = "create",
}) => {
  const { data, isLoading: isGetUserLoading } = useGetTranslatorQuery(
    {
      input: { id },
    },
    { skip: mode === "create" }
  );

  const defaultValues: Partial<User> = {
    firstName: "",
    lastName: "",
    city: "",
    state: "",
    email: "",
    phone: "",
    languages: [],
  };

  const oldTranslator = data?.getTranslator || defaultValues;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  useEffect(() => {
    if (mode === "edit" && data && data.getTranslator)
      reset(data.getTranslator);
  }, [data, mode, reset]);

  const { cities, stateISOCodes, city, setCity, state, setState } =
    useSelectCityState();

  const { languages } = useLanguages();
  const [addAndCreateTranslator, { isLoading: isAddAndCreateLoading }] =
    useAddAndCreateTranslatorMutation();
  const [updateUser, { isLoading: isUpdateLoading }] = useUpdateUserMutation();
  const { enqueueSnackbar } = useSnackbar();

  const isLoading =
    isAddAndCreateLoading || isUpdateLoading || isGetUserLoading;

  const submit: SubmitHandler<Partial<User>> = (data) => {
    if (mode === "create")
      addAndCreateTranslator({
        input: {
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          phone: data.phone || "",
          city: data.city,
          state: data.state,
          languages: data.languages || [],
        },
      }).then((res) => {
        if ("data" in res) {
          enqueueSnackbar("Successfully added translator", {
            variant: "success",
          });
          onSuccess(res.data.addAndCreateTranslator);
        } else {
          enqueueSnackbar("Unable to add or create translator", {
            variant: "error",
          });
        }
      });
    else if (mode === "edit") {
      updateUser({
        input: {
          ...oldTranslator,
          id: id,
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          phone: data.phone || "",
          city: data.city,
          state: data.state,
          languages: data.languages || [],
        },
      }).then((res) => {
        if ("data" in res) {
          enqueueSnackbar("Successfully updated translator", {
            variant: "success",
          });
          onSuccess(res.data.updateUser);
        } else {
          enqueueSnackbar("Unable to update translator", {
            variant: "error",
          });
        }
      });
    }
  };

  return (
    <ResponsiveForm onSubmit={handleSubmit(submit)}>
      <Grid
        container
        direction="column"
        width={1}
        height={1}
        gap={1}
        p={1}
        spacing={1}
      >
        <Grid item>
          <Typography textAlign="center">
            {mode === "create" ? "Add Translator" : "Edit Translator"}
          </Typography>
        </Grid>
        <FlexRowGridItem item>
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
                helperText={!!errors.firstName ? "First Name required" : " "}
              />
            )}
          />
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
        </FlexRowGridItem>
        <FlexRowGridItem item>
          <Controller
            name="phone"
            rules={{
              required: "Phone is required",
              validate: (value) => {
                if (!phone(value || "").isValid) return "Phone is invalid";

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

          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              validate: (value) => {
                if (!validateEmail(value || "")) return "Email is invalid";

                return true;
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </FlexRowGridItem>
        <FlexRowGridItem>
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
                  field.onChange(newValue);
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
                  field.onChange(newValue);
                }}
              />
            )}
          />
        </FlexRowGridItem>
        <Grid item>
          <Controller
            name="languages"
            rules={{ required: false }}
            control={control}
            render={({ field: { onChange, ...field } }) => (
              <Autocomplete
                multiple
                {...field}
                onChange={(e, newValue) => onChange(newValue)}
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
        <FlexRowGridItem
          item
          sx={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Button type="submit" variant="contained">
              {firstCharToUpper(mode)} translator
            </Button>
          )}
        </FlexRowGridItem>
      </Grid>
    </ResponsiveForm>
  );
};

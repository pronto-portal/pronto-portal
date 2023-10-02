// This component will be a form that will allow the user to edit the claimant's information using react hook form and an rtk query hook.
import React, { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Claimant, Language } from "../../types/ObjectTypes";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {
  useCreateClaimantMutation,
  useEditClaiamantMutation,
  useGetClaimantQuery,
} from "../../redux/reducers/claimantReducer";
import { useSnackbar } from "notistack";
import { ResponseData, ResponseError } from "../../types/ResponseTypes/base";
import {
  GetClaimantResponse,
  UpdateClaimantResponse,
} from "../../types/ResponseTypes";
import { useLanguages } from "../../contextProviders/LanguagesProvider";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import phone from "phone";
import { FlexRowGridItem } from "../FlexRowGridItem";
import { ModelForm } from "../../types/PropTypes/AssignmentFlowForm";
import { firstCharToUpper } from "../../utils/firstCharToUpper";
import { validateEmail } from "../../utils/validateEmail";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { ResponsiveForm } from "../ResponsiveForm/ResponsiveForm";
import { LanguagesAutocomplete } from "../LanguagesAutocomplete";

interface AddEditClaimantFormProps extends ModelForm<Claimant> {
  onSuccess: (data?: Claimant) => void;
}

interface AddEditClaimantFormInputs {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  primaryLanguage: string;
  languages: string[];
}

export const AddEditClaimantForm: React.FC<AddEditClaimantFormProps> = ({
  id = "",
  onSuccess,
  mode = "create",
  selectExisting = false,
}) => {
  const { data } = useGetClaimantQuery(
    { input: { id } },
    { skip: mode === "create" }
  );

  const defaultValues = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    primaryLanguage: "",
    languages: [],
  };

  const oldClaimant = data?.getClaimant || defaultValues;

  const [editClaimant, { isLoading: isEditLoading }] =
    useEditClaiamantMutation();
  const [createClaimant, { isLoading: isCreateClaimant }] =
    useCreateClaimantMutation();
  const { enqueueSnackbar } = useSnackbar();

  const isLoading = isEditLoading || isCreateClaimant;

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AddEditClaimantFormInputs>({
    defaultValues,
  });

  useEffect(() => {
    if (data) reset(data.getClaimant);
  }, [data, reset]);

  const onSubmit: SubmitHandler<AddEditClaimantFormInputs> = (data) => {
    const claimantData = {
      ...oldClaimant,
      id: id,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      email: data.email,
      primaryLanguage: data.primaryLanguage,
      languages: data.languages,
    };

    if (mode === "edit") {
      editClaimant({ input: claimantData }).then((res) => {
        const { data } = res as ResponseData<UpdateClaimantResponse>;

        if (data) {
          onSuccess(data.updateClaimant);
          enqueueSnackbar("Claimant updated successfully", {
            variant: "success",
          });
        } else {
          const { error } = res as ResponseError;
          enqueueSnackbar(error.message, { variant: "error" });
        }
      });
    } else if (mode === "create") {
      createClaimant({ input: data })
        .unwrap()
        .then((res) => {
          if (res) {
            onSuccess(res.createClaimant);
            enqueueSnackbar("Claimant created", { variant: "success" });
          }
        })
        .catch(({ error }: ResponseError) => {
          if (error) enqueueSnackbar(error.message, { variant: "error" });
        });
    }
  };

  return (
    <ResponsiveForm onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        spacing={1}
        direction="column"
        alignItems="center"
        width={1}
        height={1}
      >
        <Grid item>
          <Typography variant="h6" textAlign="center">
            {mode === "create"
              ? firstCharToUpper(mode) + " "
              : firstCharToUpper(mode) + " "}
            Claimant {mode === "edit" ? id : ""}
          </Typography>
        </Grid>
        <FlexRowGridItem item>
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
                helperText={errors.lastName?.message || " "}
                error={!!errors.lastName?.message}
                variant="outlined"
                fullWidth
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

          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              validate: (value) => {
                if (!validateEmail(value)) return "Email is invalid";

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

        <FlexRowGridItem item>
          <Controller
            name="primaryLanguage"
            rules={{ required: "Primary language is required" }}
            control={control}
            render={({ field: { value, onChange, ref } }) => (
              <LanguagesAutocomplete
                sx={{
                  flex: 1,
                }}
                value={value}
                onChange={onChange}
                multiple={false}
                label="Primary Language"
              />
            )}
          />

          <Controller
            name="languages"
            control={control}
            render={({ field: { value, onChange, ref } }) => (
              <LanguagesAutocomplete
                sx={{
                  flex: 1,
                }}
                value={value}
                multiple={true}
                onChange={onChange}
                ref={ref}
                label="Other languages"
              />
            )}
          />
        </FlexRowGridItem>

        <Grid
          item
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Button type="submit" variant="contained">
              {firstCharToUpper(mode)} Claimant
            </Button>
          )}
        </Grid>
      </Grid>
    </ResponsiveForm>
  );
};

AddEditClaimantForm.defaultProps = {
  id: "",
  mode: "create",
};

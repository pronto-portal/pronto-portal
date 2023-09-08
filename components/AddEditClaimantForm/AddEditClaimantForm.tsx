// This component will be a form that will allow the user to edit the claimant's information using react hook form and an rtk query hook.
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Claimant } from "../../types/ObjectTypes";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {
  useCreateClaimantMutation,
  useEditClaiamantMutation,
  useGetClaimantQuery,
} from "../../redux/reducers/claimantReducer";
import { useSnackbar } from "notistack";
import { ResponseData, ResponseError } from "../../types/ResponseTypes/base";
import { GetClaimantResponse } from "../../types/ResponseTypes";
import { useLanguages } from "../../contextProviders/LanguagesProvider";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import phone from "phone";
import { FlexRowGridItem } from "../FlexRowGridItem";
import {
  AssignmentFlowForm,
  ModelForm,
} from "../../types/PropTypes/AssignmentFlowForm";
import { firstCharToUpper } from "../../utils/firstCharToUpper";
import { validateEmail } from "../../utils/validateEmail";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

interface AddEditClaimantFormProps extends ModelForm<Claimant> {
  claimantId: string;
  onSuccess: (data?: Claimant) => void;
}

interface AddEditClaimantFormInputs {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  languages: string[];
}

export const AddEditClaimantForm: React.FC<AddEditClaimantFormProps> = ({
  claimantId,
  onSuccess,
  mode,
}) => {
  const { data } = useGetClaimantQuery(claimantId);
  const oldClaimant = data?.getClaimant || ({} as Claimant);

  const [editClaimant, { isLoading: isEditLoading }] =
    useEditClaiamantMutation();
  const [createClaimant, { isLoading: isCreateClaimant }] =
    useCreateClaimantMutation();
  const { enqueueSnackbar } = useSnackbar();

  const isLoading = isEditLoading || isCreateClaimant;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AddEditClaimantFormInputs>({
    defaultValues: oldClaimant,
  });

  const onSubmit: SubmitHandler<AddEditClaimantFormInputs> = async (data) => {
    const claimantData: Claimant = {
      ...oldClaimant,
      id: claimantId,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      email: data.email,
      languages: data.languages,
    };

    if (mode === "edit") {
      await editClaimant({ input: claimantData }).then((res) => {
        const { data } = res as ResponseData<GetClaimantResponse>;

        if (data) {
          onSuccess(data.getClaimant);
          enqueueSnackbar("Claimant updated successfully", {
            variant: "success",
          });
        } else {
          const { error } = res as ResponseError;
          enqueueSnackbar(error.message, { variant: "error" });
        }
      });
    } else if (mode === "create") {
      await createClaimant({ input: data })
        .unwrap()
        .then((res) => {
          onSuccess(res.getClaimant);
          enqueueSnackbar("Claimant created", { variant: "success" });
        })
        .catch(({ error }: ResponseError) => {
          enqueueSnackbar(error.message, { variant: "error" });
        });
    }
  };

  const { languages } = useLanguages();

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      alignItems="center"
      sx={{ width: "100%" }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FlexRowGridItem item>
          <Typography>
            {mode === "create"
              ? firstCharToUpper(mode)
              : firstCharToUpper(mode || "edit")}
            Claimant {mode === "edit" ? claimantId : ""}
          </Typography>
        </FlexRowGridItem>
        <FlexRowGridItem item>
          <Controller
            name="firstName"
            rules={{ required: "First name is required" }}
            control={control}
            render={({ field }) => (
              <TextField {...field} label="First Name" variant="outlined" />
            )}
          />
          <Controller
            name="lastName"
            rules={{ required: "Last name is required" }}
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Last Name" variant="outlined" />
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
              <TextField {...field} label="Email" variant="outlined" />
            )}
          />
        </FlexRowGridItem>

        <Grid item>
          <Controller
            name="languages"
            control={control}
            rules={{
              required: "Languages are required",
              validate: (value) => value.length > 0,
            }}
            render={({ field }) => (
              <Autocomplete
                {...field}
                multiple
                options={languages}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" label="Languages" />
                )}
              />
            )}
          />
        </Grid>

        <Grid item>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Button type="submit" variant="contained">
              Add and select claimant
            </Button>
          )}
        </Grid>
      </form>
    </Grid>
  );
};

AddEditClaimantForm.defaultProps = {
  mode: "create",
};

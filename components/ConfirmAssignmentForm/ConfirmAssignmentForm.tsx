import React from "react";
import { useAddAssignmentFlow } from "../../contextProviders/AddAssignmentFlowProvider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { AssignmentFlowForm } from "../../types/PropTypes/AssignmentFlowForm";
import { FlexRowGridItem } from "../FlexRowGridItem/FlexRowGridItem";
import { styled } from "@mui/system";
import { ObjectGridSpread } from "../ObjectGridSpread/ObjectGridSpread";
import { Address, Claimant, Translator, User } from "../../types/ObjectTypes";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import {
  useCreateAssignmentMutation,
  useCreateReminderMutation,
} from "../../redux/reducers";
import { useSnackbar } from "notistack";
import CircularProgress from "@mui/material/CircularProgress";
import { useLanguages } from "../../contextProviders/LanguagesProvider";

const FlexCard = styled(Card)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "start",
});

const FlexCardContent = styled(CardContent)({
  height: "100%",
});

export const ConfirmAssignmentForm: React.FC<AssignmentFlowForm> = ({
  onSuccess,
}) => {
  const {
    claimant,
    translator,
    date,
    createReminder,
    address,
    handleOpenEditing,
  } = useAddAssignmentFlow();

  const [createAssignment, { data, isLoading: assignmentIsLoading }] =
    useCreateAssignmentMutation();
  const [
    createReminderMutation,
    { data: reminderData, isLoading: reminderIsLoading },
  ] = useCreateReminderMutation();

  const isLoading = assignmentIsLoading || reminderIsLoading;

  const { enqueueSnackbar } = useSnackbar();

  const { getLanguageFromCode } = useLanguages();

  const handleCreateAssignment = () => {
    if (translator && claimant && date && address)
      createAssignment({
        input: {
          translatorId: translator.id,
          addressId: address.id,
          claimantId: claimant.id,
          dateTime: date,
        },
      }).then((res) => {
        if ("data" in res && res.data.createAssignment) {
          const assignment = res.data.createAssignment;

          if (createReminder) {
            createReminderMutation({
              input: {
                assignmentId: assignment.id,
              },
            }).then((reminderRes) => {
              if ("data" in reminderRes && reminderRes.data.createReminder) {
                enqueueSnackbar("Assignment with reminder created", {
                  variant: "success",
                });
                onSuccess();
              } else if ("error" in reminderRes) {
                enqueueSnackbar("Failed to create a reminder", {
                  variant: "error",
                });
              }
            });
          } else {
            enqueueSnackbar("Assignment created", { variant: "success" });
            onSuccess();
          }
        } else if ("error" in res) {
          enqueueSnackbar("Failed to create an assignment", {
            variant: "error",
          });
        }
      });
  };

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      alignItems="center"
      alignContent="start"
    >
      <Grid item xs={2}>
        <Typography variant="h5">Confirm Assignment</Typography>
      </Grid>
      <FlexRowGridItem xs={2}>
        <FlexCard sx={{ flex: 1 }}>
          <CardHeader title="Address" />
          <FlexCardContent>
            <ObjectGridSpread<Address> object={address} />
          </FlexCardContent>
          <CardActions>
            <IconButton
              onClick={() => handleOpenEditing("address")}
              disabled={isLoading}
            >
              <EditIcon />
            </IconButton>
          </CardActions>
        </FlexCard>
        <FlexCard>
          <CardHeader title="Claimant" />
          <FlexCardContent>
            <ObjectGridSpread<Claimant>
              object={{
                ...claimant,
                primaryLanguage: getLanguageFromCode(claimant.primaryLanguage),
                languages: claimant.languages.map((lang) =>
                  getLanguageFromCode(lang)
                ),
              }}
            />
          </FlexCardContent>
          <CardActions>
            <IconButton
              onClick={() => handleOpenEditing("claimant")}
              disabled={isLoading}
            >
              <EditIcon />
            </IconButton>
          </CardActions>
        </FlexCard>
      </FlexRowGridItem>
      <FlexRowGridItem xs={2}>
        <FlexCard>
          <CardHeader title="Translator" />
          <FlexCardContent>
            <ObjectGridSpread<Translator>
              object={{
                ...translator,
                languages: translator.languages.map((lang) =>
                  getLanguageFromCode(lang)
                ),
              }}
            />
          </FlexCardContent>
          <CardActions>
            <IconButton
              onClick={() => handleOpenEditing("translator")}
              disabled={isLoading}
            >
              <EditIcon />
            </IconButton>
          </CardActions>
        </FlexCard>
        <FlexCard>
          <CardHeader title="Date" />
          <CardContent>
            <Typography textAlign="center">{date?.toString()}</Typography>
          </CardContent>
          <CardActions>
            <IconButton
              onClick={() => handleOpenEditing("date")}
              disabled={isLoading}
            >
              <EditIcon />
            </IconButton>
          </CardActions>
        </FlexCard>
      </FlexRowGridItem>
      <FlexRowGridItem xs={2}>
        <FlexCard>
          <CardHeader title="Reminders" />
          <FlexCardContent>
            <Typography>
              Create Reminder: {createReminder ? "Yes" : "No"}
            </Typography>
          </FlexCardContent>
          <CardActions>
            <IconButton
              onClick={() => handleOpenEditing("reminder")}
              disabled={isLoading}
            >
              <EditIcon />
            </IconButton>
          </CardActions>
        </FlexCard>
      </FlexRowGridItem>
      <Grid item xs={2}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Button variant="contained" onClick={handleCreateAssignment}>
            Confirm
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

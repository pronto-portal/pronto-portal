import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import { FlexRowGridItem } from "../FlexRowGridItem/FlexRowGridItem";
import { ObjectGridSpread } from "../ObjectGridSpread/ObjectGridSpread";
import { Address, Claimant, Translator } from "../../types/ObjectTypes";
import { useUpdateAssignmentMutation } from "../../redux/reducers";
import { useSnackbar } from "notistack";
import { FlexCard, FlexCardContent } from "../FlexCard";
import { Assignment } from "../../types/ObjectTypes";
import { useLanguages } from "../../contextProviders/LanguagesProvider";
import { AddEditAddressForm } from "../AddEditAddressForm";
import { TranslatorSelect } from "../TranslatorSelect";
import { DateTimeForm } from "../DateTimeForm";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CircularProgress from "@mui/material/CircularProgress";
import { EditAssignmentForm } from "../EditAssignmentForm";

interface EditCalendarAssignmentProps {
  assignment: Pick<
    Assignment,
    | "id"
    | "assignedTo"
    | "claimant"
    | "address"
    | "dateTime"
    | "isComplete"
    | "translatorNoShow"
    | "claimantNoShow"
  >;
  onSuccess: (assignment?: Assignment) => void;
}

export const EditCalendarAssignment: React.FC<EditCalendarAssignmentProps> = ({
  assignment: {
    id,
    assignedTo,
    claimant,
    address,
    dateTime,
    isComplete,
    translatorNoShow,
    claimantNoShow,
  },
  onSuccess,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [updateAssignment, { isLoading }] = useUpdateAssignmentMutation({});
  const { getLanguageFromCode } = useLanguages();

  const [translator, setTranslatorObj] = useState<Translator | null>(null);
  const [addressObj, setAddressObj] = useState<Address | null>(null);
  const [dateTimeObj, setDateTimeObj] = useState<Date | null>(null);
  const [assignmentCompletion, setAssignmentCompletion] = useState({
    isComplete,
    translatorNoShow,
    claimantNoShow,
  });

  const [editAddressOpen, setEditAddressOpen] = useState<boolean>(false);
  const [editTranslatorOpen, setEditTranslatorOpen] = useState<boolean>(false);
  const [editDateTimeOpen, setEditDateTimeOpen] = useState<boolean>(false);

  const handleUpdateAssignment = () => {
    const updateAssignmentVariables: Record<string, string | boolean> = {};
    if (translator?.id) updateAssignmentVariables.translatorId = translator.id;
    if (addressObj?.id) updateAssignmentVariables.addressId = addressObj.id;
    if (dateTimeObj)
      updateAssignmentVariables.dateTime = dateTimeObj.toISOString();
    if (assignmentCompletion.isComplete !== undefined)
      updateAssignmentVariables.isComplete = assignmentCompletion.isComplete;
    if (assignmentCompletion.translatorNoShow !== undefined)
      updateAssignmentVariables.translatorNoShow =
        assignmentCompletion.translatorNoShow;
    if (assignmentCompletion.claimantNoShow !== undefined)
      updateAssignmentVariables.claimantNoShow =
        assignmentCompletion.claimantNoShow;

    console.log("assignmentCompletion", assignmentCompletion);
    updateAssignment({
      input: {
        id,
        ...updateAssignmentVariables,
      },
    }).then((res) => {
      if ("data" in res && res.data.updateAssignment) {
        enqueueSnackbar("Assignment updated", { variant: "success" });
        onSuccess(res.data.updateAssignment);
      } else if ("error" in res) {
        enqueueSnackbar("Failed to update assignment", {
          variant: "error",
        });
      }
    });
  };

  useEffect(() => {
    if (assignedTo) {
      setTranslatorObj(assignedTo);
    }

    if (address) {
      setAddressObj(address);
    }

    if (dateTime) {
      setDateTimeObj(new Date(dateTime));
    }

    if (
      isComplete !== undefined ||
      translatorNoShow !== undefined ||
      claimantNoShow !== undefined
    ) {
      setAssignmentCompletion({
        isComplete,
        translatorNoShow,
        claimantNoShow,
      });
    }
  }, [
    assignedTo,
    address,
    dateTime,
    isComplete,
    translatorNoShow,
    claimantNoShow,
  ]);

  console.log("updating assignment completion", assignmentCompletion);

  return (
    <>
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        alignContent="start"
        width="100%"
        height="100%"
      >
        {addressObj ? (
          <FlexRowGridItem item xs={2}>
            <FlexCard>
              <CardHeader title="Assignment" />
              <FlexCardContent>
                <EditAssignmentForm
                  id={id}
                  defaultValues={{
                    isComplete,
                    translatorNoShow,
                    claimantNoShow,
                  }}
                  onValueChange={(data) => {
                    if (data) {
                      setAssignmentCompletion((prevState) => ({
                        ...prevState,
                        ...data,
                      }));
                    }
                  }}
                  onSubmit={(data) => {
                    if (data) {
                      setAssignmentCompletion({
                        isComplete:
                          data.isComplete || assignmentCompletion.isComplete,
                        translatorNoShow:
                          data.translatorNoShow ||
                          assignmentCompletion.translatorNoShow,
                        claimantNoShow:
                          data.claimantNoShow ||
                          assignmentCompletion.claimantNoShow,
                      });
                    }
                  }}
                  handleUpdate={false}
                />
              </FlexCardContent>
            </FlexCard>
          </FlexRowGridItem>
        ) : null}
        {addressObj ? (
          <FlexRowGridItem item xs={2}>
            <FlexCard>
              <CardHeader title="Address" />
              <FlexCardContent>
                <ObjectGridSpread<Address> object={addressObj} />
              </FlexCardContent>
              <CardActions>
                <IconButton
                  onClick={() => {
                    setEditAddressOpen(true);
                  }}
                >
                  <EditIcon />
                </IconButton>
              </CardActions>
            </FlexCard>
          </FlexRowGridItem>
        ) : null}
        <FlexRowGridItem item xs={2}>
          <FlexCard>
            <CardHeader title="Claimant" />
            <FlexCardContent>
              <ObjectGridSpread<Claimant>
                object={{
                  ...claimant,
                  primaryLanguage: getLanguageFromCode(
                    claimant.primaryLanguage
                  ),
                  languages: claimant.languages.map((lang) =>
                    getLanguageFromCode(lang)
                  ),
                }}
              />
            </FlexCardContent>
          </FlexCard>
        </FlexRowGridItem>
        {translator ? (
          <FlexRowGridItem item xs={2}>
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
                  onClick={() => {
                    setEditTranslatorOpen(true);
                  }}
                >
                  <EditIcon />
                </IconButton>
              </CardActions>
            </FlexCard>
          </FlexRowGridItem>
        ) : null}

        {dateTimeObj ? (
          <FlexRowGridItem item xs={2}>
            <FlexCard>
              <CardHeader title="Date" />
              <CardContent>
                <Typography textAlign="center">
                  {dateTimeObj.toString()}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton
                  onClick={() => {
                    setEditDateTimeOpen(true);
                  }}
                >
                  <EditIcon />
                </IconButton>
              </CardActions>
            </FlexCard>
          </FlexRowGridItem>
        ) : null}
        <Grid item xs={2}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Button variant="contained" onClick={handleUpdateAssignment}>
              Confirm
            </Button>
          )}
        </Grid>
      </Grid>

      {addressObj ? (
        <Dialog
          open={editAddressOpen}
          onClose={() => setEditAddressOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogContent>
            <AddEditAddressForm
              mode="create"
              selectExisting
              defaultValue={addressObj}
              onSuccess={(data) => {
                if (data) {
                  setAddressObj(data);
                  setEditAddressOpen(false);
                }
              }}
            />
          </DialogContent>
        </Dialog>
      ) : null}

      {translator ? (
        <Dialog
          open={editTranslatorOpen}
          onClose={() => setEditTranslatorOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogContent>
            <TranslatorSelect
              defaultValue={translator}
              onConfirm={(data) => {
                if (data) {
                  setTranslatorObj(data);
                  setEditTranslatorOpen(false);
                }
              }}
            />
          </DialogContent>
        </Dialog>
      ) : null}

      {dateTimeObj ? (
        <Dialog
          open={editDateTimeOpen}
          onClose={() => setEditDateTimeOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogContent>
            <DateTimeForm
              mode="edit"
              defaultValue={dateTimeObj}
              onSuccess={(data) => {
                if (data) {
                  setDateTimeObj(data);
                  setEditDateTimeOpen(false);
                }
              }}
            />
          </DialogContent>
        </Dialog>
      ) : null}
    </>
  );
};
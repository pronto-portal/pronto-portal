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
import { Address, Claimant, Reminder, User } from "../../types/ObjectTypes";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

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
    remindClaimant,
    remindTranslator,
    address,
    handleOpenEditing,
  } = useAddAssignmentFlow();

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
            <IconButton onClick={() => handleOpenEditing("address")}>
              <EditIcon />
            </IconButton>
          </CardActions>
        </FlexCard>
        <FlexCard>
          <CardHeader title="Claimant" />
          <FlexCardContent>
            <ObjectGridSpread<Claimant> object={claimant} />
          </FlexCardContent>
          <CardActions>
            <IconButton onClick={() => handleOpenEditing("claimant")}>
              <EditIcon />
            </IconButton>
          </CardActions>
        </FlexCard>
      </FlexRowGridItem>
      <FlexRowGridItem xs={2}>
        <FlexCard>
          <CardHeader title="Translator" />
          <FlexCardContent>
            <ObjectGridSpread<User> object={translator} />
          </FlexCardContent>
          <CardActions>
            <IconButton onClick={() => handleOpenEditing("translator")}>
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
            <IconButton onClick={() => handleOpenEditing("date")}>
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
              Remind claimant: {remindClaimant ? "Yes" : "No"}
            </Typography>
            <Typography>
              Remind translator: {remindTranslator ? "Yes" : "No"}
            </Typography>
          </FlexCardContent>
          <CardActions>
            <IconButton onClick={() => handleOpenEditing("reminder")}>
              <EditIcon />
            </IconButton>
          </CardActions>
        </FlexCard>
      </FlexRowGridItem>
      <Grid item xs={2}>
        <Button variant="contained" onClick={onSuccess}>
          Confirm
        </Button>
      </Grid>
    </Grid>
  );
};

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
        <Typography>Confirm Assignment</Typography>
      </Grid>
      <FlexRowGridItem xs={2}>
        <FlexCard sx={{ flex: 1 }}>
          <CardHeader title="Address" />

          <CardContent>
            <ObjectGridSpread<Address> object={address} />
          </CardContent>
          <CardActions>
            <IconButton>
              <EditIcon />
            </IconButton>
          </CardActions>
        </FlexCard>
        <FlexCard>
          <CardHeader title="Claimant" />
          <CardContent>
            <ObjectGridSpread<Claimant> object={claimant} />
          </CardContent>
          <CardActions>
            <IconButton>
              <EditIcon />
            </IconButton>
          </CardActions>
        </FlexCard>
      </FlexRowGridItem>
      <FlexRowGridItem xs={2}>
        <FlexCard>
          <CardHeader title="Translator" />
          <CardContent>
            <ObjectGridSpread<User> object={translator} />
          </CardContent>{" "}
          <CardActions>
            <IconButton>
              <EditIcon />
            </IconButton>
          </CardActions>
        </FlexCard>
        <FlexCard>
          <CardHeader title="Date" />
          <CardContent>
            <Typography>{date?.toString()}</Typography>
          </CardContent>{" "}
          <CardActions>
            <IconButton>
              <EditIcon />
            </IconButton>
          </CardActions>
        </FlexCard>
      </FlexRowGridItem>
      <FlexRowGridItem xs={2}>
        <FlexCard>
          <CardHeader title="Reminders" />

          <CardContent>
            <Typography>
              Remind claimant: {remindClaimant ? "Yes" : "No"}
            </Typography>
            <Typography>
              Remind translator: {remindTranslator ? "Yes" : "No"}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton>
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

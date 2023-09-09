import React, { useEffect } from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useAddAssignmentFlow } from "../../contextProviders/AddAssignmentFlowProvider";
import Button from "@mui/material/Button";
import { AssignmentFlowForm } from "../../types/PropTypes/AssignmentFlowForm";
import Grid from "@mui/material/Grid";
import moment from "moment";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import Typography from "@mui/material/Typography";

export const DateTimeForm: React.FC<AssignmentFlowForm> = ({ onSuccess }) => {
  const { date, setDate } = useAddAssignmentFlow();
  const defaultValue = moment();

  useEffect(() => {
    setDate(defaultValue.toDate());
  }, [defaultValue, setDate]);

  const handleOnSubmit = () => {
    if (date) {
      onSuccess();
    }
  };

  return (
    <Grid
      container
      direction={"column"}
      spacing={2}
      alignItems="center"
      alignContent="center"
    >
      <Grid item xs={2}>
        <Typography variant="h5">Date and Time</Typography>
      </Grid>
      <Grid item xs={4}>
        <DateTimePicker
          label="Date Time"
          orientation="landscape"
          defaultValue={defaultValue}
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
          }}
          onChange={(newValue) => {
            if (newValue) setDate(newValue.toDate());
          }}
        />
      </Grid>
      <Grid item xs={4}>
        <Button variant={"contained"} onClick={handleOnSubmit} fullWidth>
          Confirm
        </Button>
      </Grid>
    </Grid>
  );
};

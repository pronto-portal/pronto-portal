import React, { useEffect, useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Button from "@mui/material/Button";
import { ModelForm } from "../../types/PropTypes/AssignmentFlowForm";
import Grid from "@mui/material/Grid";
import moment from "moment";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import Typography from "@mui/material/Typography";

export const DateTimeForm: React.FC<ModelForm<Date>> = ({
  onSuccess,
  mode = "create",
  defaultValue = new Date(),
}) => {
  const [date, setDate] = useState<moment.Moment>(moment(defaultValue));

  const handleOnSubmit = () => {
    console.log(date);
    if (date) {
      if (mode === "edit") onSuccess(date.toDate());
      else if (mode === "create") {
        onSuccess(date.toDate());
      }
    }
  };

  return (
    <Grid
      container
      direction={"column"}
      spacing={2}
      alignItems="center"
      alignContent="center"
      width="100%"
      height="100%"
    >
      <Grid item xs={2}>
        <Typography variant="h5">Date and Time</Typography>
      </Grid>
      <Grid item xs={4}>
        <DateTimePicker
          label="Date Time"
          orientation="landscape"
          defaultValue={defaultValue ? moment(defaultValue) : undefined}
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
          }}
          onChange={(newValue) => {
            if (newValue) setDate(newValue);
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

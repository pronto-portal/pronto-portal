import React, { useEffect, useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useAddAssignmentFlow } from "../../contextProviders/AddAssignmentFlowProvider";
import Button from "@mui/material/Button";
import { ModelForm } from "../../types/PropTypes/AssignmentFlowForm";
import Grid from "@mui/material/Grid";
import moment from "moment";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import Typography from "@mui/material/Typography";

export const DateTimeForm: React.FC<ModelForm<Date>> = ({
  onSuccess,
  mode = "create",
}) => {
  const { setDate: setFlowDate } = useAddAssignmentFlow();
  const defaultValue = moment();

  const [date, setDate] = useState<moment.Moment>(defaultValue);

  useEffect(() => {
    if (defaultValue && mode === "create") setDate(defaultValue);
    else if (mode === "edit" && date) setDate(date);
  }, [defaultValue, setDate, mode, date]);

  const handleOnSubmit = () => {
    if (date && mode === "edit") onSuccess(date.toDate());
    else if (date && mode === "create") {
      setFlowDate(date.toDate());
      onSuccess(date.toDate());
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
          defaultValue={defaultValue}
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
          }}
          onChange={(newValue) => {
            if (newValue && setDate) setDate(newValue);
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

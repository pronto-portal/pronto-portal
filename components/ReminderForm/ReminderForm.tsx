import React from "react";
import { AssignmentFlowForm } from "../../types/PropTypes/AssignmentFlowForm";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useAddAssignmentFlow } from "../../contextProviders/AddAssignmentFlowProvider";
import Button from "@mui/material/Button";
import { ResponsiveForm } from "../ResponsiveForm/ResponsiveForm";

export const ReminderForm: React.FC<AssignmentFlowForm> = ({ onSuccess }) => {
  const handleOnSubmit = () => {
    onSuccess();
  };

  const { setCreateReminder, createReminder } = useAddAssignmentFlow();

  const yesNoOptions: Record<string, boolean> = {
    yes: true,
    no: false,
  };

  return (
    <ResponsiveForm>
      <Grid
        container
        spacing={2}
        alignItems="center"
        alignContent="center"
        direction="column"
        width="100%"
        height="100%"
      >
        <Grid item>
          <Typography>Reminders</Typography>
        </Grid>
        <Grid item>
          <FormControl>
            <FormLabel>
              Would you like us to remind the translator and the claimant?
            </FormLabel>
            <RadioGroup
              defaultValue={createReminder ? "yes" : "no"}
              onChange={(e) => setCreateReminder(yesNoOptions[e.target.value])}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item>
          <Button onClick={handleOnSubmit} variant="contained">
            Next
          </Button>
        </Grid>
      </Grid>
    </ResponsiveForm>
  );
};

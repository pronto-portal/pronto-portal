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

export const ReminderForm: React.FC<AssignmentFlowForm> = ({ onSuccess }) => {
  const handleOnSubmit = () => {
    onSuccess();
  };

  const { setRemindTranslator, setRemindClaimant } = useAddAssignmentFlow();

  const yesNoOptions: Record<string, boolean> = {
    yes: true,
    no: false,
  };

  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      alignContent="center"
      direction="column"
    >
      <Grid item>
        <Typography>Reminders</Typography>
      </Grid>
      <Grid item>
        <FormControl>
          <FormLabel>Would you like us to remind the translator?</FormLabel>
          <RadioGroup
            defaultValue="yes"
            onChange={(e) => setRemindTranslator(yesNoOptions[e.target.value])}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl>
          <FormLabel>Would you like us to remind the claimant?</FormLabel>
          <RadioGroup
            defaultValue="yes"
            onChange={(e) => setRemindClaimant(yesNoOptions[e.target.value])}
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
  );
};

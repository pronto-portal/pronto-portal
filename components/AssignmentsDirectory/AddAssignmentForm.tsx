import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { AddressForm } from "../AddressForm";

interface AddAssignmentsFormProps {
  open: boolean;
  handleClose: () => void;
}

export const AddAssignmentsForm: React.FC<AddAssignmentsFormProps> = ({
  open,
  handleClose,
}) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleNextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handlePrevStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Add Assignment</DialogTitle>
      <DialogContent>
        <Stack
          direction="column"
          spacing={2}
          justifyContent="flex-start"
          alignItems="center"
        >
          <Stepper activeStep={activeStep}>
            <Step>
              <StepLabel>Enter claimant details</StepLabel>
            </Step>
            <Step>
              <StepLabel>Select translator</StepLabel>
            </Step>
            <Step>
              <StepLabel>Set date and time</StepLabel>
            </Step>
            <Step>
              <StepLabel>Enter address details</StepLabel>
            </Step>
          </Stepper>
          {activeStep === 0 && <AddressForm onSuccess={() => {}} />}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

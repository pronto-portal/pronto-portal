import React, { useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { DialogActions, IconButton } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { useAddAssignmentFlow } from '../../contextProviders/AddAssignmentFlowProvider';
import { AddressForm } from '../AddressForm';
import { ClaimantForm } from '../ClaimantForm/ClaimantForm';
import { ConfirmAssignmentForm } from '../ConfirmAssignmentForm';
import { DateTimeForm } from '../DateTimeForm';
import { ReminderForm } from '../ReminderForm';
import { TranslatorForm } from '../TranslatorForm';

interface AddAssignmentsFormProps {
    open: boolean;
    handleClose: () => void;
}

export const AddAssignmentsForm: React.FC<AddAssignmentsFormProps> = ({ open, handleClose }) => {
    const [activeStep, setActiveStep] = useState<number>(0);

    const handleNextStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handlePrevStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const { reset, date, setDate, claimant, translator, address } = useAddAssignmentFlow();

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth='md'>
            <DialogTitle textAlign='center'>Add Assignment</DialogTitle>
            <DialogContent>
                <Stack direction='column' spacing={2} justifyContent='flex-start' alignItems='center'>
                    <Stepper activeStep={activeStep}>
                        <Step>
                            <StepLabel>Enter address details</StepLabel>
                        </Step>
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
                            <StepLabel>Set reminders</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Confirm</StepLabel>
                        </Step>
                    </Stepper>
                    {activeStep === 0 && (
                        <AddressForm
                            onSuccess={() => {
                                setActiveStep(1);
                            }}
                        />
                    )}
                    {activeStep === 1 && <ClaimantForm onSuccess={() => setActiveStep(2)} />}
                    {activeStep === 2 && <TranslatorForm onSuccess={() => setActiveStep(3)} />}
                    {activeStep === 3 && (
                        <DateTimeForm
                            onSuccess={(newDate) => {
                                if (newDate) {
                                    setDate(newDate);
                                    setActiveStep(4);
                                }
                            }}
                            {...(date ? { defaultValue: date } : {})}
                        />
                    )}
                    {activeStep === 4 && (
                        <ReminderForm
                            onSuccess={() => setActiveStep(5)}
                            claimant={claimant}
                            translator={translator}
                            assignmentAddress={address}
                            assignmentDate={date}
                        />
                    )}
                    {activeStep === 5 && (
                        <ConfirmAssignmentForm
                            onSuccess={() => {
                                setActiveStep(0);
                                handleClose();
                                reset();
                            }}
                        />
                    )}
                </Stack>
            </DialogContent>
            <DialogActions>
                <Stack direction='row' justifyContent='space-between' alignItems='center' width='100%'>
                    <IconButton onClick={handlePrevStep} disabled={activeStep === 0}>
                        <ArrowBackIosNewIcon />
                    </IconButton>
                    <IconButton onClick={handleNextStep} disabled={activeStep === 5}>
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Stack>
            </DialogActions>
        </Dialog>
    );
};

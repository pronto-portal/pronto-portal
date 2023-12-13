import React from 'react';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useUpdateAssignmentMutation } from '../../redux/reducers';
import { UpdateAssignment } from '../../types/InputTypes';

interface EditAssignmentFormProps {
    id: string;
    onSubmit: () => void;
    defaultValues?: Partial<UpdateAssignment>;
    open: boolean;
    handleClose: () => void;
}

const FlexGridItem = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
}));

export const EditAssignmentForm: React.FC<EditAssignmentFormProps> = ({ id, onSubmit, defaultValues, open, handleClose }) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<UpdateAssignment>({
        defaultValues,
    });

    const { enqueueSnackbar } = useSnackbar();
    const [updateAssignment] = useUpdateAssignmentMutation();

    const onSubmitHandler: SubmitHandler<UpdateAssignment> = async (data) => {
        await updateAssignment({ input: { ...data, id: id } }).then((data) => {
            if ('data' in data && data.data.updateAssignment) {
                enqueueSnackbar('Successfully updated assignment', {
                    variant: 'success',
                });
            } else {
                enqueueSnackbar('Failed to update assignment', {
                    variant: 'error',
                });
            }
        });
        onSubmit();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
            <DialogTitle>Edit Assignment</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <Grid spacing={2} container>
                        <FlexGridItem item>
                            <Typography>Translator No Show</Typography>
                            <Controller
                                name='translatorNoShow'
                                control={control}
                                render={({ field: { ref, value, onChange } }) => (
                                    <Checkbox
                                        ref={ref}
                                        defaultChecked={defaultValues?.translatorNoShow}
                                        checked={value}
                                        onChange={(e, newValue) => {
                                            onChange(newValue);
                                        }}
                                    />
                                )}
                            />
                        </FlexGridItem>

                        <FlexGridItem item>
                            <Typography>Claimant No Show</Typography>
                            <Controller
                                name='claimantNoShow'
                                control={control}
                                render={({ field: { ref, value, onChange } }) => {
                                    return (
                                        <Checkbox
                                            ref={ref}
                                            defaultChecked={defaultValues?.claimantNoShow}
                                            checked={value}
                                            onChange={(e, newValue) => {
                                                onChange(newValue);
                                            }}
                                        />
                                    );
                                }}
                            />
                        </FlexGridItem>

                        <FlexGridItem item>
                            <Typography>Assignment Is Complete</Typography>
                            <Controller
                                name='isComplete'
                                control={control}
                                render={({ field: { ref, value, onChange } }) => (
                                    <Checkbox
                                        ref={ref}
                                        defaultChecked={defaultValues?.isComplete}
                                        checked={value}
                                        onChange={(e, newValue) => {
                                            onChange(newValue);
                                        }}
                                    />
                                )}
                            />
                        </FlexGridItem>
                        <FlexGridItem sx={{ justifyContent: 'center' }}>
                            <Button type='submit' variant='contained'>
                                Submit
                            </Button>
                        </FlexGridItem>
                    </Grid>
                </form>
            </DialogContent>
        </Dialog>
    );
};

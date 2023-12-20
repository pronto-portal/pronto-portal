import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useToggleAssignmentCancellationMutation, useUpdateAssignmentMutation } from '../../redux/reducers';
import { UpdateAssignment } from '../../types/InputTypes';
import { ConfirmationModal } from '../ConfirmationModal';
import { ResponsiveForm } from '../ResponsiveForm';

interface EditAssignmentOnChangeData {
    claimantNoShow?: boolean;
    translatorNoShow?: boolean;
    isComplete?: boolean;
}

interface EditAssignmentFormProps {
    id: string;
    onSubmit: (data?: EditAssignmentOnChangeData) => void;
    defaultValues?: Partial<UpdateAssignment>;
    isCancelled?: boolean;
    handleUpdate?: boolean;
    onValueChange?: (data: EditAssignmentOnChangeData) => void;
}

const FlexGridItem = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
}));

export const EditAssignmentForm: React.FC<EditAssignmentFormProps> = ({
    id,
    onSubmit,
    defaultValues,
    handleUpdate = true,
    isCancelled = false,
    onValueChange = (_data: EditAssignmentOnChangeData) => {},
}) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<UpdateAssignment>({
        defaultValues,
    });

    const { enqueueSnackbar } = useSnackbar();
    const [updateAssignment] = useUpdateAssignmentMutation();
    const [toggleAssignmentCancellation] = useToggleAssignmentCancellationMutation();
    const [openConfirmCancelAssignment, setOpenConfirmCancelAssignment] = useState<boolean>(false);

    const onSubmitHandler: SubmitHandler<UpdateAssignment> = async (data) => {
        if (handleUpdate)
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
        onSubmit({
            claimantNoShow: data.claimantNoShow,
            translatorNoShow: data.translatorNoShow,
            isComplete: data.isComplete,
        });
    };

    return (
        <>
            <ResponsiveForm onSubmit={handleSubmit(onSubmitHandler)}>
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
                                        if (!handleUpdate) onValueChange({ translatorNoShow: newValue });
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
                                            if (!handleUpdate) onValueChange({ claimantNoShow: newValue });
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
                                        if (!handleUpdate) onValueChange({ isComplete: newValue });
                                        onChange(newValue);
                                    }}
                                />
                            )}
                        />
                    </FlexGridItem>

                    <FlexGridItem sx={{ justifyContent: 'center', columnGap: '1rem', rowGap: '1rem' }}>
                        {handleUpdate ? (
                            <Button type='submit' variant='contained'>
                                Submit
                            </Button>
                        ) : null}
                        <Button
                            variant='contained'
                            onClick={() => {
                                setOpenConfirmCancelAssignment(true);
                            }}
                            color={isCancelled ? 'success' : 'error'}
                        >
                            {isCancelled ? 'Activate Assignment' : 'Cancel Assignment'}
                        </Button>
                    </FlexGridItem>
                </Grid>
            </ResponsiveForm>
            <ConfirmationModal
                open={openConfirmCancelAssignment}
                type={isCancelled ? 'info' : 'warning'}
                onClose={() => setOpenConfirmCancelAssignment(false)}
                message={isCancelled ? 'Are you sure you want to activate this assignment?' : 'Are you sure you want to cancel this assignment?'}
                onConfirm={() => {
                    toggleAssignmentCancellation({
                        input: {
                            id,
                        },
                    }).then((data) => {
                        if ('data' in data && data.data.toggleAssignmentCancellation) {
                            enqueueSnackbar(isCancelled ? 'Successfully activated this assignment' : 'Successfully cancelled assignment', {
                                variant: 'success',
                            });
                            setOpenConfirmCancelAssignment(false);
                            onSubmit({});
                        } else {
                            enqueueSnackbar(isCancelled ? 'Failed to activate this assignment' : 'Failed to cancel assignment', {
                                variant: 'error',
                            });
                        }
                    });
                }}
            />
        </>
    );
};

import React, { useEffect, useState, useMemo } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import { useLanguages } from '../../contextProviders/LanguagesProvider';
import { useCreateReminderMutation, useDeleteReminderMutation, useUpdateAssignmentMutation, useUpdateReminderMutation } from '../../redux/reducers';
import { ReminderFlowInput } from '../../types/InputTypes';
import { Address, Claimant, Reminder, Translator } from '../../types/ObjectTypes';
import { Assignment } from '../../types/ObjectTypes';
import convertCronExpressionToUTC from '../../utils/convertCronExpressionToUTC';
import convertUTCCronExpressionToLocal from '../../utils/convertUTCCronExpressionToLocal';
import isReminderCronConfigured from '../../utils/isReminderCronConfigured';
import { AddEditAddressForm } from '../AddEditAddressForm';
import { DateTimeForm } from '../DateTimeForm';
import { EditAssignmentForm } from '../EditAssignmentForm';
import { FlexCard, FlexCardContent } from '../FlexCard';
import { FlexRowGridItem } from '../FlexRowGridItem/FlexRowGridItem';
import { ObjectGridSpread } from '../ObjectGridSpread/ObjectGridSpread';
import { ReminderForm } from '../ReminderForm';
import { ReminderInfo } from '../ReminderInfo';
import { TranslatorSelect } from '../TranslatorSelect';
interface EditCalendarAssignmentProps {
    assignment: Pick<Assignment, 'id' | 'assignedTo' | 'claimant' | 'address' | 'dateTime' | 'isComplete' | 'translatorNoShow' | 'claimantNoShow' | 'reminder'>;
    onSuccess: (assignment?: Assignment) => void;
}

export const EditCalendarAssignment: React.FC<EditCalendarAssignmentProps> = ({
    assignment: { id, assignedTo, claimant, address, dateTime, isComplete, translatorNoShow, claimantNoShow, reminder },
    onSuccess,
}) => {
    const defaultReminderObj = useMemo(() => {
        return {
            createReminder: reminder ? true : false, // a reminder is created if cronSchedule is not falsy
            configureReminderSchedule: isReminderCronConfigured(reminder && reminder.cronSchedule ? reminder.cronSchedule : '', new Date(dateTime)), // true if reminder cron is exactly 1 day before assignment date
            translatorMessage: reminder && reminder.translatorMessage ? reminder.translatorMessage : '',
            claimantMessage: reminder && reminder.claimantMessage ? reminder.claimantMessage : '',
            cronSchedule: reminder && reminder.cronSchedule ? reminder.cronSchedule : '',
        };
    }, [reminder, dateTime]);

    const { enqueueSnackbar } = useSnackbar();
    const [updateAssignment, { isLoading: assignmentIsLoading }] = useUpdateAssignmentMutation({});
    const [updateReminder, { isLoading: reminderIsLoading }] = useUpdateReminderMutation({});
    const [createReminder, { isLoading: createReminderIsLoading }] = useCreateReminderMutation({});
    const [deleteReminder, { isLoading: deleteReminderIsLoading }] = useDeleteReminderMutation({});

    const isLoading = assignmentIsLoading || reminderIsLoading || createReminderIsLoading || deleteReminderIsLoading;

    const { getLanguageFromCode } = useLanguages();

    const [translator, setTranslatorObj] = useState<Translator | null>(assignedTo ? assignedTo : null);
    const [addressObj, setAddressObj] = useState<Address | null>(address);
    const [dateTimeObj, setDateTimeObj] = useState<Date | null>(new Date(dateTime));
    const [assignmentCompletion, setAssignmentCompletion] = useState({
        isComplete: isComplete !== undefined ? isComplete : false,
        translatorNoShow: translatorNoShow !== undefined ? translatorNoShow : false,
        claimantNoShow: claimantNoShow !== undefined ? claimantNoShow : false,
    });

    // todo: reminder message variables should be substitued on the api side
    const [reminderObj, setReminderObj] = useState<ReminderFlowInput>(defaultReminderObj);

    const [editAddressOpen, setEditAddressOpen] = useState<boolean>(false);
    const [editTranslatorOpen, setEditTranslatorOpen] = useState<boolean>(false);
    const [editDateTimeOpen, setEditDateTimeOpen] = useState<boolean>(false);
    const [editReminderOpen, setEditReminderOpen] = useState<boolean>(false);

    const handleUpdateAssignment = () => {
        const updateAssignmentVariables: Record<string, string | boolean> = {};
        if (translator?.id) updateAssignmentVariables.translatorId = translator.id;
        if (addressObj?.id) updateAssignmentVariables.addressId = addressObj.id;
        if (dateTimeObj) updateAssignmentVariables.dateTime = dateTimeObj.toISOString();
        if (assignmentCompletion.isComplete !== undefined) updateAssignmentVariables.isComplete = assignmentCompletion.isComplete;
        if (assignmentCompletion.translatorNoShow !== undefined) updateAssignmentVariables.translatorNoShow = assignmentCompletion.translatorNoShow;
        if (assignmentCompletion.claimantNoShow !== undefined) updateAssignmentVariables.claimantNoShow = assignmentCompletion.claimantNoShow;

        updateAssignment({
            input: {
                id,
                ...updateAssignmentVariables,
            },
        }).then((res) => {
            if ('data' in res && res.data.updateAssignment) {
                enqueueSnackbar('Assignment updated', { variant: 'success' });

                if (reminderObj.createReminder) {
                    const updateReminderVariables: Record<string, string | boolean> = {};
                    const originalCronSchedule = reminderObj && reminderObj.cronSchedule ? reminderObj.cronSchedule : '';

                    if (reminderObj.translatorMessage) updateReminderVariables.translatorMessage = reminderObj.translatorMessage;
                    if (reminderObj.claimantMessage) updateReminderVariables.claimantMessage = reminderObj.claimantMessage;
                    if (reminderObj.cronSchedule) updateReminderVariables.cronSchedule = reminderObj.cronSchedule;

                    // Check if the reminderObj differs from the assignment reminder. if it differs then update the reminder. By comparing translatorMessage, claimantMessage, and CronSchedule
                    const reminderHasBeenUpdated =
                        reminder &&
                        (reminder.translatorMessage !== reminderObj.translatorMessage ||
                            reminder.claimantMessage !== reminderObj.claimantMessage ||
                            reminder.cronSchedule !== reminderObj.cronSchedule);

                    if (!reminder && reminderObj.createReminder) {
                        console.log('createReminder');
                        return createReminder({
                            input: {
                                assignmentId: id,
                                ...(updateReminderVariables as Pick<Reminder, 'translatorMessage' | 'claimantMessage' | 'cronSchedule'>),
                            },
                        }).then((createReminderRes) => {
                            if ('data' in createReminderRes && createReminderRes.data.createReminder) {
                                enqueueSnackbar('Reminder created', { variant: 'success' });
                                onSuccess();
                            } else if ('error' in createReminderRes) {
                                enqueueSnackbar('Failed to create reminder', {
                                    variant: 'error',
                                });
                            }
                        });
                    } else if (reminderHasBeenUpdated && reminderObj.createReminder)
                        return updateReminder({
                            input: {
                                id: reminder.id,
                                ...updateReminderVariables,
                            },
                        }).then((updateReminderRes) => {
                            if ('data' in updateReminderRes && updateReminderRes.data.updateReminder) {
                                enqueueSnackbar('Reminder updated', { variant: 'success' });
                                onSuccess();
                            } else if ('error' in updateReminderRes) {
                                enqueueSnackbar('Failed to update reminder', {
                                    variant: 'error',
                                });
                            }
                        });
                } else if (reminder && !reminderObj.createReminder) {
                    return deleteReminder({
                        input: {
                            id: reminder.id,
                        },
                    })
                        .then((deleteReminderRes) => {
                            console.log('deleteReminder res', 'data' in deleteReminderRes && deleteReminderRes?.data?.data?.response?.data?.deleteReminder);
                            if ('data' in deleteReminderRes && deleteReminderRes.data.deleteReminder) {
                                enqueueSnackbar('Reminder deleted', { variant: 'success' });
                                onSuccess();
                            } else if ('error' in deleteReminderRes) {
                                console.error('deleteReminder error', deleteReminderRes.error);
                                enqueueSnackbar('Failed to delete reminder', {
                                    variant: 'error',
                                });
                            }
                        })
                        .catch((err) => {
                            console.error('deleteReminder error', err);
                        });
                }

                onSuccess(res.data.updateAssignment);
            } else if ('error' in res) {
                enqueueSnackbar('Failed to update assignment', {
                    variant: 'error',
                });
            }
        });
    };

    return (
        <>
            <Grid container spacing={2} direction='column' alignItems='center' alignContent='start' width='100%' height='100%'>
                {addressObj ? (
                    <FlexRowGridItem item xs={2}>
                        <FlexCard>
                            <CardHeader title='Assignment' />
                            <FlexCardContent>
                                <EditAssignmentForm
                                    id={id}
                                    defaultValues={{
                                        isComplete,
                                        translatorNoShow,
                                        claimantNoShow,
                                    }}
                                    onValueChange={(data) => {
                                        if (data) {
                                            setAssignmentCompletion((prevState) => ({
                                                ...prevState,
                                                ...data,
                                            }));
                                        }
                                    }}
                                    onSubmit={(data) => {
                                        if (data) {
                                            setAssignmentCompletion({
                                                isComplete: data.isComplete || assignmentCompletion.isComplete,
                                                translatorNoShow: data.translatorNoShow || assignmentCompletion.translatorNoShow,
                                                claimantNoShow: data.claimantNoShow || assignmentCompletion.claimantNoShow,
                                            });
                                        }
                                    }}
                                    handleUpdate={false}
                                />
                            </FlexCardContent>
                        </FlexCard>
                    </FlexRowGridItem>
                ) : null}
                {addressObj ? (
                    <FlexRowGridItem item xs={2}>
                        <FlexCard>
                            <CardHeader title='Address' />
                            <FlexCardContent>
                                <ObjectGridSpread<Address> object={addressObj} />
                            </FlexCardContent>
                            <CardActions>
                                <IconButton
                                    onClick={() => {
                                        setEditAddressOpen(true);
                                    }}
                                >
                                    <EditIcon />
                                </IconButton>
                            </CardActions>
                        </FlexCard>
                    </FlexRowGridItem>
                ) : null}
                <FlexRowGridItem item xs={2}>
                    <FlexCard>
                        <CardHeader title='Claimant' />
                        <FlexCardContent>
                            <ObjectGridSpread<Claimant>
                                object={{
                                    ...claimant,
                                    primaryLanguage: getLanguageFromCode(claimant.primaryLanguage),
                                    languages: claimant.languages.map((lang) => getLanguageFromCode(lang)),
                                }}
                            />
                        </FlexCardContent>
                    </FlexCard>
                </FlexRowGridItem>
                {translator ? (
                    <FlexRowGridItem item xs={2}>
                        <FlexCard>
                            <CardHeader title='Translator' />
                            <FlexCardContent>
                                <ObjectGridSpread<Translator>
                                    object={{
                                        ...translator,
                                        languages: translator.languages.map((lang) => getLanguageFromCode(lang)),
                                    }}
                                />
                            </FlexCardContent>
                            <CardActions>
                                <IconButton
                                    onClick={() => {
                                        setEditTranslatorOpen(true);
                                    }}
                                >
                                    <EditIcon />
                                </IconButton>
                            </CardActions>
                        </FlexCard>
                    </FlexRowGridItem>
                ) : null}

                {dateTimeObj ? (
                    <FlexRowGridItem item xs={2}>
                        <FlexCard>
                            <CardHeader title='Date' />
                            <CardContent>
                                <Typography textAlign='center'>{dateTimeObj.toString()}</Typography>
                            </CardContent>
                            <CardActions>
                                <IconButton
                                    onClick={() => {
                                        setEditDateTimeOpen(true);
                                    }}
                                >
                                    <EditIcon />
                                </IconButton>
                            </CardActions>
                        </FlexCard>
                    </FlexRowGridItem>
                ) : null}

                <FlexRowGridItem item xs={2}>
                    <FlexCard>
                        <CardHeader title='Reminders' />
                        <FlexCardContent>
                            <ReminderInfo
                                reminderObj={{
                                    ...reminderObj,
                                    cronSchedule: reminderObj.cronSchedule ? convertUTCCronExpressionToLocal(reminderObj.cronSchedule) : '',
                                }}
                            />
                        </FlexCardContent>
                        <CardActions>
                            <IconButton onClick={() => setEditReminderOpen(true)} disabled={isLoading}>
                                <EditIcon />
                            </IconButton>
                        </CardActions>
                    </FlexCard>
                </FlexRowGridItem>

                <Grid item xs={2}>
                    {isLoading ? (
                        <CircularProgress />
                    ) : (
                        <Button variant='contained' onClick={handleUpdateAssignment}>
                            Confirm
                        </Button>
                    )}
                </Grid>
            </Grid>

            {addressObj ? (
                <Dialog open={editAddressOpen} onClose={() => setEditAddressOpen(false)} maxWidth='md' fullWidth>
                    <DialogContent>
                        <AddEditAddressForm
                            mode='create'
                            selectExisting
                            defaultValue={addressObj}
                            onSuccess={(data) => {
                                if (data) {
                                    setAddressObj(data);
                                    setEditAddressOpen(false);
                                }
                            }}
                        />
                    </DialogContent>
                </Dialog>
            ) : null}

            {translator ? (
                <Dialog open={editTranslatorOpen} onClose={() => setEditTranslatorOpen(false)} maxWidth='md' fullWidth>
                    <DialogContent>
                        <TranslatorSelect
                            defaultValue={translator}
                            onConfirm={(data) => {
                                if (data) {
                                    setTranslatorObj(data);
                                    setEditTranslatorOpen(false);
                                }
                            }}
                        />
                    </DialogContent>
                </Dialog>
            ) : null}

            {dateTimeObj ? (
                <Dialog open={editDateTimeOpen} onClose={() => setEditDateTimeOpen(false)} maxWidth='md' fullWidth>
                    <DialogContent>
                        <DateTimeForm
                            mode='edit'
                            defaultValue={dateTimeObj}
                            onSuccess={(data) => {
                                if (data) {
                                    setDateTimeObj(data);
                                    setEditDateTimeOpen(false);
                                }
                            }}
                        />
                    </DialogContent>
                </Dialog>
            ) : null}

            {reminderObj ? (
                <Dialog open={editReminderOpen} onClose={() => setEditReminderOpen(false)} maxWidth='md' fullWidth>
                    <DialogContent>
                        <ReminderForm
                            defaultValue={reminderObj}
                            assignmentDate={dateTimeObj || undefined}
                            assignmentAddress={addressObj || address}
                            onSuccess={(data) => {
                                if (data) {
                                    if (data.cronSchedule) data.cronSchedule = convertCronExpressionToUTC(data.cronSchedule);

                                    setReminderObj(data);
                                    setEditReminderOpen(false);
                                }
                            }}
                        />
                    </DialogContent>
                </Dialog>
            ) : null}
        </>
    );
};

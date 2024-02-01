import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import { useAddAssignmentFlow } from '../../contextProviders/AddAssignmentFlowProvider';
import { useLanguages } from '../../contextProviders/LanguagesProvider';
import { useCreateAssignmentMutation, useCreateReminderMutation } from '../../redux/reducers';
import { Address, Claimant, Translator } from '../../types/ObjectTypes';
import { AssignmentFlowForm } from '../../types/PropTypes/AssignmentFlowForm';
import convertCronExpressionToUTC from '../../utils/convertCronExpressionToUTC';
import isReminderCronConfigured from '../../utils/isReminderCronConfigured';
import { FlexCard, FlexCardContent } from '../FlexCard';
import { FlexRowGridItem } from '../FlexRowGridItem/FlexRowGridItem';
import { ObjectGridSpread } from '../ObjectGridSpread/ObjectGridSpread';
import { ReminderInfo } from '../ReminderInfo';

export const ConfirmAssignmentForm: React.FC<AssignmentFlowForm> = ({ onSuccess }) => {
    const { claimant, translator, date, createReminder, address, handleOpenEditing, reminder } = useAddAssignmentFlow();

    const [createAssignment, { data, isLoading: assignmentIsLoading }] = useCreateAssignmentMutation();
    const [createReminderMutation, { data: reminderData, isLoading: reminderIsLoading }] = useCreateReminderMutation();

    const isLoading = assignmentIsLoading || reminderIsLoading;

    const { enqueueSnackbar } = useSnackbar();

    const { getLanguageFromCode } = useLanguages();
    // console.log(reminder.cronSchedule && convertCronExpressionToUTC(reminder.cronSchedule));

    const handleCreateAssignment = () => {
        if (translator && claimant && date && address)
            createAssignment({
                input: {
                    translatorId: translator.id,
                    addressId: address.id,
                    claimantId: claimant.id,
                    dateTime: date,
                },
            }).then((res) => {
                if ('data' in res && res.data.createAssignment) {
                    const assignment = res.data.createAssignment;

                    if (createReminder) {
                        createReminderMutation({
                            input: {
                                assignmentId: assignment.id,
                                cronSchedule: reminder.cronSchedule ? convertCronExpressionToUTC(reminder.cronSchedule) : '',
                                translatorMessage: reminder.translatorMessage,
                                claimantMessage: reminder.claimantMessage,
                            },
                        }).then((reminderRes) => {
                            if ('data' in reminderRes && reminderRes.data.createReminder) {
                                enqueueSnackbar('Assignment with reminder created', {
                                    variant: 'success',
                                });
                                onSuccess();
                            } else if ('error' in reminderRes) {
                                enqueueSnackbar('Failed to create a reminder', {
                                    variant: 'error',
                                });
                            }
                        });
                    } else {
                        enqueueSnackbar('Assignment created', { variant: 'success' });
                        onSuccess();
                    }
                } else if ('error' in res) {
                    enqueueSnackbar('Failed to create an assignment', {
                        variant: 'error',
                    });
                }
            });
    };

    // console.log('reminder', reminder);

    return (
        <Grid container spacing={2} direction='column' alignItems='center' alignContent='start'>
            <Grid item xs={2}>
                <Typography variant='h5'>Confirm Assignment</Typography>
            </Grid>
            <FlexRowGridItem xs={2}>
                <FlexCard sx={{ flex: 1 }}>
                    <CardHeader title='Address' />
                    <FlexCardContent>
                        <ObjectGridSpread<Address> object={address} />
                    </FlexCardContent>
                    <CardActions>
                        <IconButton onClick={() => handleOpenEditing('address')} disabled={isLoading}>
                            <EditIcon />
                        </IconButton>
                    </CardActions>
                </FlexCard>
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
                    <CardActions>
                        <IconButton onClick={() => handleOpenEditing('claimant')} disabled={isLoading}>
                            <EditIcon />
                        </IconButton>
                    </CardActions>
                </FlexCard>
            </FlexRowGridItem>
            <FlexRowGridItem xs={2}>
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
                        <IconButton onClick={() => handleOpenEditing('translator')} disabled={isLoading}>
                            <EditIcon />
                        </IconButton>
                    </CardActions>
                </FlexCard>
                <FlexCard>
                    <CardHeader title='Date' />
                    <CardContent>
                        <Typography textAlign='center'>{date?.toString()}</Typography>
                    </CardContent>
                    <CardActions>
                        <IconButton onClick={() => handleOpenEditing('date')} disabled={isLoading}>
                            <EditIcon />
                        </IconButton>
                    </CardActions>
                </FlexCard>
            </FlexRowGridItem>
            <FlexRowGridItem xs={2}>
                <FlexCard>
                    <CardHeader title='Reminders' />
                    <FlexCardContent>
                        <ReminderInfo
                            reminderObj={{
                                configureReminderSchedule: isReminderCronConfigured(reminder.cronSchedule, date),
                                createReminder: createReminder,
                                cronSchedule: reminder?.cronSchedule,
                                translatorMessage: reminder?.translatorMessage,
                                claimantMessage: reminder?.claimantMessage,
                            }}
                        />
                    </FlexCardContent>
                    <CardActions>
                        <IconButton onClick={() => handleOpenEditing('reminder')} disabled={isLoading}>
                            <EditIcon />
                        </IconButton>
                    </CardActions>
                </FlexCard>
            </FlexRowGridItem>
            <Grid item xs={2}>
                {isLoading ? (
                    <CircularProgress />
                ) : (
                    <Button variant='contained' onClick={handleCreateAssignment}>
                        Confirm
                    </Button>
                )}
            </Grid>
        </Grid>
    );
};

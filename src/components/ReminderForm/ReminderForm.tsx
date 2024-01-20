import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Words, TextArea } from './styles';
import { Reminder } from '../../redux/graphql/codegen/types/graphql';
import { Address, Claimant, Translator } from '../../types/ObjectTypes';
import Word from '../../types/word';
import formatAMPM from '../../utils/formatAMPM';
import CronJobBuilder from '../CronBuilder/CronBuilder';
import { LegendReplaceInput } from '../LegendReplaceInput';
import { ResponsiveForm } from '../ResponsiveForm/ResponsiveForm';

interface ReminderFormProps {
    onSuccess: (data?: Reminder) => void;
    claimant?: Claimant;
    translator?: Translator;
    assignmentDate?: Date;
    assignmentAddress?: Address;
}

interface DraggableItem {
    type: string;
    word: string;
}

export const ReminderForm: React.FC<ReminderFormProps> = ({ onSuccess, claimant, translator, assignmentDate, assignmentAddress }) => {
    const formattedAddressText: string = assignmentAddress
        ? `${assignmentAddress.address1}${assignmentAddress.address2 ? `, ${assignmentAddress.address2}` : ''} ${assignmentAddress.city}, ${
              assignmentAddress.state
          } ${assignmentAddress.zipCode}`
        : '';
    const addressWords: Word[] = formattedAddressText ? [{ label: 'Address', word: formattedAddressText }] : [];

    const dateWords: Word[] = assignmentDate
        ? [
              { label: 'Date', word: assignmentDate.toLocaleDateString() },
              { label: 'Time', word: formatAMPM(assignmentDate) },
          ]
        : [];

    const sharedWords: Word[] = [...dateWords, ...addressWords];

    const claimantWords: Word[] = claimant
        ? [
              { label: 'First Name', word: claimant.firstName },
              { label: 'Last Name', word: claimant.lastName },
              { label: 'Email', word: claimant.email },
              { label: 'phone', word: claimant.phone },
              ...sharedWords,
          ]
        : [...sharedWords];

    const translatorWords: Word[] = translator
        ? [
              { label: 'First Name', word: translator.firstName },
              { label: 'Last Name', word: translator.lastName },
              { label: 'Email', word: translator.email },
              { label: 'phone', word: translator.phone },
              ...sharedWords,
          ]
        : [...sharedWords];

    const [cronString, setCronString] = useState<string>('');

    const [translatorMessage, setTranslatorMessage] = useState<string>('');
    const [claimantMessage, setClaimantMessage] = useState<string>('');
    const [claimantPreview, setClaimantPreview] = useState<string>('');
    const [translatorPreview, setTranslatorPreview] = useState<string>('');
    const [cron, setCron] = useState<string>('');

    const handleOnSubmit = () => {
        onSuccess();
    };

    const [createReminder, setCreateReminder] = useState<boolean>(false);

    const yesNoOptions: Record<string, boolean> = {
        yes: true,
        no: false,
    };

    return (
        <ResponsiveForm>
            <Grid container spacing={2} alignItems='center' alignContent='center' direction='column' width='100%' height='100%'>
                <Grid item>
                    <Typography>Reminders</Typography>
                </Grid>
                <Grid item>
                    <FormControl>
                        <FormLabel>Would you like us to remind the translator and the claimant?</FormLabel>
                        <RadioGroup defaultValue={createReminder ? 'yes' : 'no'} onChange={(e) => setCreateReminder(yesNoOptions[e.target.value])}>
                            <FormControlLabel value='yes' control={<Radio />} label='Yes' />
                            <FormControlLabel value='no' control={<Radio />} label='No' />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                {createReminder && (
                    <Grid item container direction='column'>
                        <Grid item>
                            <Typography>Configure the intervals to which this reminder will be sent</Typography>
                            <Box>
                                <CronJobBuilder
                                    defaultValue={cron}
                                    onChange={(cron) => {
                                        setCronString(cron);
                                    }}
                                />
                            </Box>
                        </Grid>
                        <Grid
                            item
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'start',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography>Translator Message</Typography>
                            <LegendReplaceInput words={translatorWords} enablePreview={true} />
                        </Grid>

                        <Grid
                            item
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'start',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography>Claimant Message</Typography>
                            <LegendReplaceInput words={claimantWords} enablePreview={true} />
                        </Grid>
                    </Grid>
                )}
                <Grid item>
                    <Button onClick={handleOnSubmit} variant='contained'>
                        Next
                    </Button>
                </Grid>
            </Grid>
        </ResponsiveForm>
    );
};

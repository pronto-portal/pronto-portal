import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ReminderFlowInput } from '../../types/InputTypes';
import describeReminderCronExpression from '../../utils/describeReminderCronExpression';

interface ReminderInfoProps {
    reminderObj?: ReminderFlowInput;
}

export const ReminderInfo = ({ reminderObj }: ReminderInfoProps) => {
    if (!reminderObj) return null;

    return (
        <Stack direction='column' spacing={2} width={1} height={1}>
            <Typography>Create Reminder: {reminderObj?.createReminder ? 'Yes' : 'No'}</Typography>
            {reminderObj.createReminder ? (
                <>
                    <Typography>
                        {reminderObj.cronSchedule
                            ? describeReminderCronExpression(reminderObj.cronSchedule)
                            : 'Reminder will be sent the day before the assignment'}
                    </Typography>
                    <Typography>
                        <b>Translator Message: </b> {reminderObj.translatorMessage}
                    </Typography>
                    <Typography>
                        <b>Claimant Message: </b> {reminderObj.claimantMessage}
                    </Typography>
                </>
            ) : null}
        </Stack>
    );
};

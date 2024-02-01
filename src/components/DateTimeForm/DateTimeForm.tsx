import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import moment from 'moment';
import { ModelForm } from '../../types/PropTypes/AssignmentFlowForm';

export const DateTimeForm: React.FC<ModelForm<Date>> = ({ onSuccess, mode = 'create', defaultValue = new Date() }) => {
    const [date, setDate] = useState<moment.Moment>(moment(defaultValue));

    const handleOnSubmit = () => {
        if (date) {
            if (mode === 'edit') onSuccess(date.toDate());
            else if (mode === 'create') {
                onSuccess(date.toDate());
            }
        }
    };

    return (
        <Grid container direction={'column'} spacing={2} alignItems='center' alignContent='center' width='100%' height='100%'>
            <Grid item xs={2}>
                <Typography variant='h5'>Date and Time</Typography>
            </Grid>
            <Grid item xs={4}>
                <DateTimePicker
                    label='Date Time'
                    orientation='landscape'
                    defaultValue={defaultValue ? moment(defaultValue) : undefined}
                    viewRenderers={{
                        hours: renderTimeViewClock,
                        minutes: renderTimeViewClock,
                    }}
                    onChange={(newValue) => {
                        if (newValue) setDate(newValue);
                    }}
                />
            </Grid>
            <Grid item xs={4}>
                <Button variant={'contained'} onClick={handleOnSubmit} fullWidth>
                    Confirm
                </Button>
            </Grid>
        </Grid>
    );
};

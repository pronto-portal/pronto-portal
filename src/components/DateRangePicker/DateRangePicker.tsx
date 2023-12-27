/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, use } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import moment from 'moment';

interface DateRangePickerProps {
    onChange(date1: Date | undefined, date2: Date | undefined): void;
    date1Default?: Date;
    date2Default?: Date;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({ onChange, date1Default, date2Default }) => {
    const [date1, setDate1] = useState<moment.Moment>();
    const [date2, setDate2] = useState<moment.Moment>();

    useEffect(() => {
        if (date1Default) setDate1(moment(date1Default));
        if (date2Default) setDate2(moment(date2Default));

        if (date1Default && date2Default) {
            onChange(date1Default, date2Default);
        }
    }, []);

    return (
        <Stack direction='row' alignItems='center' justifyContent='center' spacing={1} width='100%' height='100%'>
            <DateTimePicker
                label='Date 1'
                value={date1}
                defaultValue={date1Default ? moment(date1Default) : undefined}
                onChange={(newValue) => {
                    if (newValue) {
                        setDate1(newValue);

                        onChange(newValue.toDate(), date2 && date2.toDate());
                    }
                }}
            />
            <Typography>-</Typography>
            <DateTimePicker
                label='Date 2'
                value={date2}
                defaultValue={date2Default ? moment(date2Default) : undefined}
                onChange={(newValue) => {
                    if (newValue) {
                        setDate2(newValue);

                        onChange(date1 && date1.toDate(), newValue.toDate());
                    }
                }}
            />
        </Stack>
    );
};

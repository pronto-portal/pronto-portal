import React, { useState, useEffect } from 'react';
import { Stack, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { daysOfWeek, months } from '../../utils/constants';
import describeReminderCronExpression, { parseDayOfWeekStringCronPart } from '../../utils/describeReminderCronExpression';
import getDateTimeDetailsFromCronExpression from '../../utils/getDateTimeDetailsFromCronExpression';
import { getDefaultReminderCronString } from '../../utils/getDefaultReminderCronString';

const StyledFormControl = styled(FormControl)`
    flex: 1;
`;

interface CronJobBuilderProps {
    onChange: (cronString: string) => void;
    defaultValue?: string;
    defaultDate?: Date;
}
const CronBuilder: React.FC<CronJobBuilderProps> = ({ onChange, defaultValue, defaultDate }) => {
    const defaultYear = defaultDate ? defaultDate.getFullYear() : new Date().getFullYear();

    // console.log('defaultYear', defaultYear);
    const defaultCronString = defaultDate ? getDefaultReminderCronString(defaultDate.toISOString()) : `0 12 1 1 ? ${defaultYear}`;

    // console.log('defaultDate', defaultDate);
    // console.log('defaultCronString', defaultCronString);

    const { minute, hour, dayOfMonth, month, dayOfWeek, isPM, year } = getDateTimeDetailsFromCronExpression(defaultValue || defaultCronString);
    const defaultSelectWeekday = dayOfWeek.length > 1 || (dayOfWeek.length === 1 && dayOfWeek[0] !== '*' && dayOfWeek[0] !== '?');

    const [selectedMinute, setMinute] = useState(minute);
    // the default hour needs to handle the possibility of being 12pm, which is 12 in 24 hour time, but 0 in 12 hour time
    const [selectedHour, setHour] = useState(!isPM && hour === 0 ? 12 : hour);
    const [selectedIsPM, setIsPM] = useState(isPM);
    const [selectedDayOfMonth, setDayOfMonth] = useState<string | number>(dayOfMonth);
    const [selectedMonth, setMonth] = useState<string | number>(month);
    const [selectedDayOfWeek, setDayOfWeek] = useState<string[]>(dayOfWeek);
    const [selectWeekday, setSelectWeekday] = useState(defaultSelectWeekday);

    const hourInCron = selectedIsPM ? (selectedHour % 12) + 12 : selectedHour % 12;
    // console.log('defaultValue', defaultValue);
    // console.log('hour', selectedHour);
    // console.log('hourInCron', hourInCron);

    const parsedSelectedDayOfWeek = parseDayOfWeekStringCronPart(selectedDayOfWeek);
    const cronString = `${selectedMinute} ${hourInCron} ${selectedDayOfMonth} ${selectedMonth} ${parsedSelectedDayOfWeek.join(',')} ${year}`;

    useEffect(() => onChange(cronString), [cronString, onChange]);

    // Helper function to generate menu items
    const generateMenuItems = (start: number, end: number, key: string) => {
        const items = [];
        for (let i = start; i <= end; i++) {
            items.push(
                <MenuItem key={`CronBuilder${key}${i}`} value={i}>
                    {i}
                </MenuItem>
            );
        }
        return items;
    };

    const generateDayOfWeekItems = () => {
        return Object.entries(daysOfWeek).map(([num, day]) => (
            <MenuItem key={`CronBuilder${day}`} value={num}>
                {day}
            </MenuItem>
        ));
    };

    const generateMonthItems = () => {
        return Object.entries(months).map(([num, month]) => (
            <MenuItem key={`CronBuilder${month}`} value={num}>
                {month}
            </MenuItem>
        ));
    };

    const CronToReminderText = describeReminderCronExpression(cronString, selectWeekday, selectedIsPM);

    useEffect(() => {
        if (selectWeekday) {
            setDayOfMonth('?');
        } else {
            setDayOfWeek([]);
        }
    }, [selectWeekday]);

    return (
        <Stack direction='column' spacing={2} alignItems='center'>
            <Typography variant='subtitle1' color='warning.main'>
                (*) note, you may only configure a day of month or days of week, not both.{' '}
            </Typography>
            <StyledFormControl fullWidth>
                <TextField select value={selectedMonth} onChange={(e) => setMonth(e.target.value)} label={'Month'} sx={{ flex: 1 }}>
                    <MenuItem value={''}></MenuItem>
                    <MenuItem value={'?'}>Every Month</MenuItem>
                    {generateMonthItems()}
                </TextField>
            </StyledFormControl>

            <StyledFormControl
                fullWidth
                sx={{ display: 'flex', flexDirection: 'row', rowGap: '1rem', columnGap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}
            >
                <FormControlLabel
                    control={<Switch checked={selectWeekday} onChange={(e) => setSelectWeekday(e.target.checked)} />}
                    label={selectWeekday ? 'Every week on these weekdays' : 'Select specific day of month'}
                    sx={{ flex: 0.75 }}
                />
                {!selectWeekday ? (
                    <StyledFormControl fullWidth>
                        <TextField select value={selectedDayOfMonth} onChange={(e) => setDayOfMonth(e.target.value)} label={'Day of month'} sx={{ flex: 1 }}>
                            <MenuItem value={''}></MenuItem>
                            <MenuItem value={'?'}>Every Day</MenuItem>
                            {generateMenuItems(1, 31, 'dayOfMonth')}
                        </TextField>
                    </StyledFormControl>
                ) : null}
                {selectWeekday ? (
                    <StyledFormControl fullWidth>
                        <TextField
                            fullWidth
                            select
                            inputProps={{ multiple: true }}
                            value={selectedDayOfWeek}
                            label={'Day of week'}
                            onChange={(e) => {
                                if (typeof e.target.value === 'string') {
                                    return setDayOfWeek([e.target.value]);
                                } else {
                                    setDayOfWeek(e.target.value);
                                }
                            }}
                            sx={{ flex: 1 }}
                        >
                            {generateDayOfWeekItems()}
                        </TextField>
                    </StyledFormControl>
                ) : null}
            </StyledFormControl>
            <StyledFormControl
                fullWidth
                sx={{ display: 'flex', flexDirection: 'row', rowGap: '1rem', columnGap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}
            >
                <TextField select value={selectedHour} onChange={(e) => setHour(+e.target.value)} label={'Hour'} sx={{ flex: 1 }}>
                    {generateMenuItems(1, 12, 'hour')}
                </TextField>
                <TextField select value={selectedMinute} onChange={(e) => setMinute(+e.target.value)} label={'Minute'} sx={{ flex: 1 }}>
                    {generateMenuItems(0, 59, 'minute')}
                </TextField>
                <FormControlLabel
                    control={<Switch checked={selectedIsPM} onChange={(e) => setIsPM(e.target.checked)} />}
                    label={selectedIsPM ? 'PM' : 'AM'}
                    sx={{ flex: 0.25 }}
                />
            </StyledFormControl>
            <Typography sx={{ width: '100%' }}>{CronToReminderText}</Typography>
        </Stack>
    );
};

export default CronBuilder;

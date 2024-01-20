import React, { useState, useEffect, useCallback } from 'react';
import { Stack, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { daysOfWeek, months } from '../../utils/constants';
import { FlexRowGridItem } from '../FlexRowGridItem';

const StyledFormControl = styled(FormControl)`
    flex: 1;
`;

interface CronJobBuilderProps {
    onChange: (cronString: string) => void;
    defaultValue?: string;
}
const CronJobBuilder: React.FC<CronJobBuilderProps> = ({ onChange, defaultValue }) => {
    const parseDefaultValue = useCallback(() => {
        if (!defaultValue) return { minute: 0, hour: 12, isPM: false, dayOfMonth: '*', month: '*', dayOfWeek: ['*'] };

        const parts = defaultValue.split(' ');
        if (parts.length !== 5) return { minute: 0, hour: 12, isPM: false, dayOfMonth: '*', month: '*', dayOfWeek: ['*'] };

        const [minute, hour, dayOfMonth, month, dayOfWeek] = parts;

        const dayOfWeekString = dayOfWeek.split(',');
        const hourNumber = parseInt(hour, 10);
        return {
            minute: +minute,
            hour: hourNumber > 12 ? hourNumber - 12 : hourNumber,
            isPM: hourNumber >= 12,
            dayOfMonth: +dayOfMonth,
            month: +month,
            dayOfWeek: dayOfWeekString,
        };
    }, [defaultValue]);

    const [selectedMinute, setMinute] = useState(0);
    const [selectedHour, setHour] = useState(0);
    const [selectedIsPM, setIsPM] = useState(true);
    const [selectedDayOfMonth, setDayOfMonth] = useState<string | number>(1);
    const [selectedMonth, setMonth] = useState<string | number>(1);
    const [selectedDayOfWeek, setDayOfWeek] = useState<string[]>([]);
    const [selectWeekday, setSelectWeekday] = useState(false);

    useEffect(() => {
        // onChange(cronString);

        // set defaults
        const { minute, hour, isPM, dayOfMonth, month, dayOfWeek } = parseDefaultValue();
        setMinute(minute);
        setHour(hour);
        setIsPM(isPM);
        setDayOfMonth(dayOfMonth);
        setMonth(month);
        setDayOfWeek(dayOfWeek);
    }, [defaultValue, parseDefaultValue]);

    const hourInCron = selectedIsPM ? (selectedHour % 12) + 12 : selectedHour % 12;
    const cronString = `${selectedMinute} ${hourInCron} ${selectedDayOfMonth} ${selectedMonth} ${selectedDayOfWeek}`;

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
        return daysOfWeek.map((day, index) => (
            <MenuItem key={`CronBuilder${day}`} value={index}>
                {day}
            </MenuItem>
        ));
    };

    const generateMonthItems = () => {
        return months.map((month, index) => (
            <MenuItem key={`CronBuilder${month}`} value={index}>
                {month}
            </MenuItem>
        ));
    };

    const timeFromSelectedHourAndDay: string = `${selectedHour}:${selectedMinute < 10 ? `0${selectedMinute}` : selectedMinute} ${selectedIsPM ? 'PM' : 'AM'}`;

    const formattedMonth = selectedMonth === '*' ? 'every month' : months[+selectedMonth - 1];
    const formattedDayOfMonth =
        selectedDayOfMonth === '*'
            ? selectWeekday
                ? selectedDayOfWeek.length === 0 || selectedDayOfWeek[0] === '*'
                    ? 'every day'
                    : 'every week'
                : 'every day'
            : selectedDayOfMonth;
    const formattedDayOfWeek = selectedDayOfWeek
        .map((day) => (day === '*' ? daysOfWeek.join(', ') : daysOfWeek[+day]))
        .join(', ')
        .trim();

    useEffect(() => {
        if (selectWeekday) {
            setDayOfMonth('*');
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
                    <MenuItem value={'*'}>Every Month</MenuItem>
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

                            <MenuItem value={'*'}>Every Day</MenuItem>
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
            <Typography sx={{ width: '100%' }}>
                Your reminder(s) will be sent <b>{formattedMonth}</b>, <b>{formattedDayOfMonth}</b> at <b>{timeFromSelectedHourAndDay}</b>
                {formattedDayOfWeek ? (
                    <>
                        {' on '} <b> {formattedDayOfWeek} </b>
                    </>
                ) : (
                    ''
                )}
            </Typography>
            {/* <Typography>{cronString}</Typography> */}
        </Stack>
    );
};

export default CronJobBuilder;

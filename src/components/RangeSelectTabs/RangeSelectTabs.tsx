import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TimePeriodSelect from '../../types/timeperiodSelect';
import { firstCharToUpper } from '../../utils/firstCharToUpper';
import { splitCamelCase } from '../../utils/splitCamelCase';

interface RangeSelectTabsProps {
    onChange: (value: TimePeriodSelect) => void;
    options: string[];
}

export const RangeSelectTabs: React.FC<RangeSelectTabsProps> = ({ onChange, options }) => {
    const [timePeriod, setTimePeriod] = useState<string>(options[0]); // ["1 Month", "3 Month", "6 Month", "1 Year", "All"

    return (
        <Stack direction='row' spacing={2} justifyContent='space-between'>
            <Tabs
                value={timePeriod}
                onChange={(_, newValue) => {
                    setTimePeriod(newValue);
                    onChange(newValue);
                }}
            >
                {options.map((option) => (
                    <Tab key={`${option}AnalyticsSelectTab`} label={firstCharToUpper(splitCamelCase(option))} value={option} />
                ))}
            </Tabs>
        </Stack>
    );
};

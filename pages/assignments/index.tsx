import React, { useState } from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TableRowsIcon from '@mui/icons-material/TableRows';
import { Stack } from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { AssignmentsCalendarView } from '../../src/components/AssignmentsCalendarView';
import { AssignmentDirectory } from '../../src/components/AssignmentsDirectory';
import { AssignmentWriteProvider } from '../../src/contextProviders/AssignmentWriteProvider';
import { ClaimantWriteProvider } from '../../src/contextProviders/ClaimantWriteProvider/ClaimantWriteProvider';
import { FilteredAssignmentsProvider } from '../../src/contextProviders/FilteredAssignmentsProvider/FilteredAssignmentsProvider';

export default function Assignments() {
    const [tab, setTab] = useState<string>('calendar');
    console.log('new tab', tab);

    return (
        <FilteredAssignmentsProvider>
            <AssignmentWriteProvider>
                <ClaimantWriteProvider>
                    <Stack direction='column' width='100%' height='100%' alignItems='flex-start' justifyContent='flex-start' spacing={2} p={2}>
                        <Tabs sx={{ padding: 0 }} value={tab} onChange={(e, newTab) => setTab(newTab)}>
                            <Tab label={<CalendarMonthIcon />} value='calendar' />
                            <Tab label={<TableRowsIcon />} value='table' />
                        </Tabs>

                        {tab === 'calendar' ? <AssignmentsCalendarView /> : <AssignmentDirectory />}
                    </Stack>
                </ClaimantWriteProvider>
            </AssignmentWriteProvider>
        </FilteredAssignmentsProvider>
    );
}

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { AddAssignmentFlowProvider } from '../../contextProviders/AddAssignmentFlowProvider';
import { useLanguages } from '../../contextProviders/LanguagesProvider';
import { useGetAssignmentsQuery } from '../../redux/reducers';
import { Assignment } from '../../types/ObjectTypes';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { AddAssignmentsForm } from '../AssignmentsDirectory/AddAssignmentForm';
import { EditCalendarAssignment } from '../EditCalendarAssignment';

const localizer = momentLocalizer(moment);

export const AssignmentsCalendarView: React.FC = () => {
    const [openAddAssignmentsForm, setOpenAddAssignmentsForm] = useState<boolean>(false);
    const { data, isLoading } = useGetAssignmentsQuery({
        where: {
            isCancelled: false,
        },
    });
    const { getLanguageFromCode } = useLanguages();
    const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
    const [openEditAssignmentForm, setOpenEditAssignmentForm] = useState<boolean>(false);

    const assignments = data && data.getAssignments ? data.getAssignments.assignments : ([] as Assignment[]);

    const events = assignments.map((assignment) => {
        const claimant = assignment.claimant;
        const address = assignment.address;

        const claimantName = `${claimant.firstName} ${claimant.lastName}`;
        const claimantPrimaryLanguage = getLanguageFromCode(claimant.primaryLanguage);
        const addressString = `${address.address1} ${address.address2} ${address.city}, ${address.state} ${address.zipCode}`;

        const title = `${claimantName} (${claimantPrimaryLanguage}) - ${addressString}`;
        return {
            start: new Date(assignment.dateTime),
            end: new Date(assignment.dateTime),
            title,
            assignment,
        };
    });

    const theme = useTheme();

    return (
        <>
            <Stack width='100%' height='100%' direction='column' justifyContent={isLoading ? 'center' : 'flex-start'} alignItems='center' spacing={2}>
                {isLoading ? (
                    <CircularProgress />
                ) : (
                    <>
                        <Calendar
                            localizer={localizer}
                            events={events}
                            startAccessor='start'
                            endAccessor='end'
                            style={{
                                height: '100%',
                                width: '100%',
                                fontFamily: `'Montserrat', sans-serif`,
                            }}
                            onSelectEvent={(event) => {
                                setSelectedAssignment(event.assignment);
                                setOpenEditAssignmentForm(true);
                            }}
                            eventPropGetter={(event) => {
                                const { assignment } = event;
                                const { claimantNoShow, translatorNoShow, isComplete } = assignment;
                                const style = {
                                    backgroundColor: 'rgba(0,0,0,0.6)',
                                    borderRadius: '5px',
                                    color: '#fff',
                                    border: 'none',
                                    boxShadow: 'none',
                                    opacity: 1,
                                };

                                if (claimantNoShow || translatorNoShow) {
                                    style.backgroundColor = theme.palette.error.main;
                                } else if (isComplete) {
                                    style.backgroundColor = theme.palette.success.main;
                                }

                                return {
                                    style,
                                };
                            }}
                        />
                        <Stack direction='row' justifyContent='flex-end' width='100%'>
                            <Button variant='contained' onClick={() => setOpenAddAssignmentsForm(true)}>
                                Add Assignment
                            </Button>
                        </Stack>
                    </>
                )}
            </Stack>
            <Dialog open={openEditAssignmentForm} onClose={() => setOpenEditAssignmentForm(false)} maxWidth='md' fullWidth>
                <DialogTitle>Assignment</DialogTitle>
                <DialogContent>
                    {selectedAssignment ? <EditCalendarAssignment assignment={selectedAssignment} onSuccess={() => setOpenEditAssignmentForm(false)} /> : null}
                </DialogContent>
            </Dialog>
            <AddAssignmentFlowProvider>
                <AddAssignmentsForm open={openAddAssignmentsForm} handleClose={() => setOpenAddAssignmentsForm(false)} />
            </AddAssignmentFlowProvider>
        </>
    );
};

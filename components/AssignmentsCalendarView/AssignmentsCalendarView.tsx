import React from "react";
import Box from "@mui/material/Box";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useGetAssignmentsQuery } from "../../redux/reducers";
import CircularProgress from "@mui/material/CircularProgress";
import { Assignment } from "../../types/ObjectTypes";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export const AssignmentsCalendarView: React.FC = () => {
  const { data, isLoading } = useGetAssignmentsQuery({});

  const assignments =
    data && data.getAssignments
      ? data.getAssignments.assignments
      : ([] as Assignment[]);

  const events = assignments.map((assignment) => {
    const claimant = assignment.claimant;
    const address = assignment.address;

    const claimantName = `${claimant.firstName} ${claimant.lastName}`;
    const claimantPrimaryLanguage = claimant.primaryLanguage;
    const addressString = `${address.address1} ${address.address2} ${address.city}, ${address.state} ${address.zipCode}`;

    const title = `${claimantName} (${claimantPrimaryLanguage}) - ${addressString}`;
    return {
      start: new Date(assignment.dateTime),
      end: new Date(assignment.dateTime),
      title,
    };
  });

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "#fff",
      }}
    >
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%" }}
        />
      )}
    </Box>
  );
};

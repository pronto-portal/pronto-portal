import { Stack } from "@mui/material";
import { FilteredAssignmentsProvider } from "../../contextProviders/FilteredAssignmentsProvider/FilteredAssignmentsProvider";
import { ClaimantWriteProvider } from "../../contextProviders/ClaimantWriteProvider/ClaimantWriteProvider";
import React, { useState } from "react";
import { AssignmentDirectory } from "../../components/AssignmentsDirectory";
import { AssignmentWriteProvider } from "../../contextProviders/AssignmentWriteProvider";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TableRowsIcon from "@mui/icons-material/TableRows";

export default function Assignments() {
  const [tab, setTab] = useState<string>("calendar");

  return (
    <FilteredAssignmentsProvider>
      <AssignmentWriteProvider>
        <Tabs
          sx={{ height: "100%", padding: 0 }}
          value={tab}
          onChange={(e, newTab) => setTab(newTab)}
        >
          <Tab label={<CalendarMonthIcon />} value="calendar" />
          <Tab label={<TableRowsIcon />} value="table" />
        </Tabs>

        {tab === "calendar" ? (
          "test"
        ) : (
          <Stack
            direction="column"
            width="100%"
            height="100%"
            alignItems="flex-start"
            justifyContent="flex-start"
            spacing={2}
            p={2}
          >
            <AssignmentDirectory />
          </Stack>
        )}
      </AssignmentWriteProvider>
    </FilteredAssignmentsProvider>
  );
}

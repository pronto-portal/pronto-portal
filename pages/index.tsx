import { Box, Paper, Stack } from "@mui/material";
import { TranslatorDirectory } from "../components/IconLabel";
import { FilteredTranslatorsProvider } from "../contextProviders/FilteredTranslatorsProvider";
import { FilteredAssignmentsProvider } from "../contextProviders/FilteredAssignmentsProvider/FilteredAssignmentsProvider";
import { AssignmentDirectory } from "../components/AssignmentsDirectory/AssignmentsDirectory";
import { FilteredClaimantsProvider } from "../contextProviders/FilteredClaimantsProvider/FilteredClaimantsProvider";
import { ClaimantsDirectory } from "../components/ClaimantsDirectory";
import { AssignmentWriteProvider } from "../contextProviders/AssignmentWriteProvider/AssignmentWriteProvider";
import { TranslatorWriteProvider } from "../contextProviders/TranslatorWriteProvider";
import { ClaimantWriteProvider } from "../contextProviders/ClaimantWriteProvider/ClaimantWriteProvider";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import React, { useState } from "react";

export default function Home() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const selectedTab: {
    [key: number]: React.ReactNode;
  } = {
    0: <TranslatorDirectory />,
    1: <AssignmentDirectory />,
    2: <ClaimantsDirectory />,
  };

  return (
    <FilteredTranslatorsProvider>
      <TranslatorWriteProvider>
        <FilteredAssignmentsProvider>
          <AssignmentWriteProvider>
            <FilteredClaimantsProvider>
              <ClaimantWriteProvider>
                <Stack
                  direction="column"
                  width="100%"
                  height="100%"
                  alignItems="flex-start"
                  justifyContent="flex-start"
                  spacing={2}
                  p={2}
                >
                  <Box sx={{ width: "100%" }}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                      >
                        <Tab label="Translators" />
                        <Tab label="Assignments" />
                        <Tab label="Claimants" />
                      </Tabs>
                    </Box>
                  </Box>
                  {selectedTab[value]}
                </Stack>
              </ClaimantWriteProvider>
            </FilteredClaimantsProvider>
          </AssignmentWriteProvider>
        </FilteredAssignmentsProvider>
      </TranslatorWriteProvider>
    </FilteredTranslatorsProvider>
  );
}

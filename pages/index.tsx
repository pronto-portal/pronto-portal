import { Box, Stack } from "@mui/material";
import { TranslatorDirectory } from "../components/IconLabel";
import { FilteredTranslatorsProvider } from "../contextProviders/FilteredTranslatorsProvider";
import { FilteredAssignmentsProvider } from "../contextProviders/FilteredAssignmentsProvider/FilteredAssignmentsProvider";
import { AssignmentDirectory } from "../components/AssignmentsDirectory/AssignmentsDirectory";
import { FilteredClaimantsProvider } from "../contextProviders/FilteredClaimantsProvider/FilteredClaimantsProvider";
import { ClaimantsDirectory } from "../components/ClaimantsDirectory";

export default function Home() {
  return (
    <Stack
      direction="column"
      width="100%"
      height="100%"
      alignItems="flex-start"
      justifyContent="flex-start"
      spacing={2}
      p={2}
    >
      <FilteredTranslatorsProvider>
        <TranslatorDirectory />
      </FilteredTranslatorsProvider>
      <FilteredAssignmentsProvider>
        <AssignmentDirectory />
      </FilteredAssignmentsProvider>
      <FilteredClaimantsProvider>
        <ClaimantsDirectory />
      </FilteredClaimantsProvider>
    </Stack>
  );
}

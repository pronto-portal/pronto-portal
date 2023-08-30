import { Stack } from "@mui/material";
import { TranslatorDirectory } from "../components/IconLabel";
import { FilteredTranslatorsProvider } from "../contextProviders/FilteredTranslatorsProvider";
import { FilteredAssignmentsProvider } from "../contextProviders/FilteredAssignmentsProvider/FilteredAssignmentsProvider";
import { AssignmentDirectory } from "../components/AssignmentsDirectory/AssignmentsDirectory";

export default function Home() {
  // Gets the current user and caches it for other components to use
  return (
    <Stack
      direction="column"
      width="100%"
      height="100%"
      alignItems="center"
      justifyContent="flex-start"
      p={2}
    >
      <FilteredTranslatorsProvider>
        <TranslatorDirectory />
      </FilteredTranslatorsProvider>
      <FilteredAssignmentsProvider>
        <AssignmentDirectory />
      </FilteredAssignmentsProvider>
    </Stack>
  );
}

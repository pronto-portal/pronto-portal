import { Stack } from "@mui/material";
import { TranslatorDirectory } from "../components/IconLabel";
import { FilteredTranslatorsProvider } from "../contextProviders/FilteredTranslatorsProvider";
import { FilteredAssignmentsProvider } from "../contextProviders/FilteredAssignmentsProvider/FilteredAssignmentsProvider";
import { AssignmentDirectory } from "../components/AssignmentsDirectory/AssignmentsDirectory";

export default function Home() {
  return (
    <Stack
      direction="column"
      width="100%"
      height="100%"
      alignItems="center"
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
    </Stack>
  );
}

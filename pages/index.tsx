import { Stack } from "@mui/material";
import { TranslatorDirectory } from "../components/IconLabel";
import { FilteredTranslatorsProvider } from "../contextProviders/FilteredTranslatorsProvider";
import { FilteredAssignmentsProvider } from "../contextProviders/FilteredAssignmentsProvider/FilteredAssignmentsProvider";
import { AssignmentDirectory } from "../components/AssignmentsDirectory/AssignmentsDirectory";
import { FilteredClaimantsProvider } from "../contextProviders/FilteredClaimantsProvider/FilteredClaimantsProvider";
import { ClaimantsDirectory } from "../components/ClaimantsDirectory";
import { AssignmentWriteProvider } from "../contextProviders/AssignmentWriteProvider/AssignmentWriteProvider";
import { TranslatorWriteProvider } from "../contextProviders/TranslatorWriteProvider";

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
        <TranslatorWriteProvider>
          <TranslatorDirectory />
        </TranslatorWriteProvider>
      </FilteredTranslatorsProvider>
      <FilteredAssignmentsProvider>
        <AssignmentWriteProvider>
          <TranslatorWriteProvider>
            <AssignmentDirectory />
          </TranslatorWriteProvider>
        </AssignmentWriteProvider>
      </FilteredAssignmentsProvider>
      <FilteredClaimantsProvider>
        <ClaimantsDirectory />
      </FilteredClaimantsProvider>
    </Stack>
  );
}

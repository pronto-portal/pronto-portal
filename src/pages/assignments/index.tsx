import { Stack } from '@mui/material';
import { AssignmentDirectory } from '../../components/AssignmentsDirectory';
import { ClaimantWriteProvider } from '../../contextProviders/ClaimantWriteProvider/ClaimantWriteProvider';
import { FilteredAssignmentsProvider } from '../../contextProviders/FilteredAssignmentsProvider/FilteredAssignmentsProvider';

export default function Assignments() {
    return (
        <FilteredAssignmentsProvider>
            <ClaimantWriteProvider>
                <Stack direction='column' width='100%' height='100%' alignItems='flex-start' justifyContent='flex-start' spacing={2} p={2}>
                    <AssignmentDirectory />
                </Stack>
            </ClaimantWriteProvider>
        </FilteredAssignmentsProvider>
    );
}

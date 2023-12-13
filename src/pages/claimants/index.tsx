import React from 'react';
import { Stack } from '@mui/material';
import { ClaimantsDirectory } from '../../components/ClaimantsDirectory';
import { ClaimantWriteProvider } from '../../contextProviders/ClaimantWriteProvider/ClaimantWriteProvider';
import { FilteredClaimantsProvider } from '../../contextProviders/FilteredClaimantsProvider/FilteredClaimantsProvider';

export default function Claimants() {
    return (
        <FilteredClaimantsProvider>
            <ClaimantWriteProvider>
                <Stack direction='column' width='100%' height='100%' alignItems='flex-start' justifyContent='flex-start' spacing={2} p={2}>
                    <ClaimantsDirectory />
                </Stack>
            </ClaimantWriteProvider>
        </FilteredClaimantsProvider>
    );
}

import { Stack } from "@mui/material";
import { FilteredClaimantsProvider } from "../../contextProviders/FilteredClaimantsProvider/FilteredClaimantsProvider";
import { ClaimantWriteProvider } from "../../contextProviders/ClaimantWriteProvider/ClaimantWriteProvider";
import React from "react";
import { ClaimantsDirectory } from "../../components/ClaimantsDirectory";

export default function Claimants() {
  return (
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
          <ClaimantsDirectory />
        </Stack>
      </ClaimantWriteProvider>
    </FilteredClaimantsProvider>
  );
}

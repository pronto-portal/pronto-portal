import { Stack } from "@mui/material";
import { FilteredTranslatorsProvider } from "../contextProviders/FilteredTranslatorsProvider";
import { TranslatorWriteProvider } from "../contextProviders/TranslatorWriteProvider";
import React from "react";
import { TranslatorDirectory } from "../components/TranslatorDirectory/TranslatorDirectory";

export default function Translators() {
  return (
    <FilteredTranslatorsProvider>
      <TranslatorWriteProvider>
        <Stack
          direction="column"
          width="100%"
          height="100%"
          alignItems="flex-start"
          justifyContent="flex-start"
          spacing={2}
          p={2}
        >
          <TranslatorDirectory />
        </Stack>
      </TranslatorWriteProvider>
    </FilteredTranslatorsProvider>
  );
}

import { Stack } from "@mui/material";
import React from "react";
import { Analytics } from "../../components/Analytics";

export default function AnalyticsPage() {
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
      <Analytics />
    </Stack>
  );
}

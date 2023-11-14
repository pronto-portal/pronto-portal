import { Stack } from "@mui/material";
import React from "react";
import Typography from "@mui/material/Typography";

export default function Home() {
  return (
    <Stack
      direction="column"
      width="100%"
      height="100%"
      alignItems="center"
      justifyContent="center"
      spacing={2}
      p={2}
    >
      <Typography variant="h2">Welcome to Pronto Portal!</Typography>
    </Stack>
  );
}

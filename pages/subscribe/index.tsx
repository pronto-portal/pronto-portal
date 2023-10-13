import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { SubscriptionCards } from "../../components/SubscriptionCards/SubscriptionCards";
import Typography from "@mui/material/Typography";

export default function subscribe() {
  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100%"
      spacing={2}
      padding={3}
    >
      <Typography variant="h3">Subscribe</Typography>
      <Box width="100%">
        <SubscriptionCards />
      </Box>
    </Stack>
  );
}

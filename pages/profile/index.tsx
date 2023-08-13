import React from "react";
import { Stack, Paper, Typography, Grid } from "@mui/material";
import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: session } = useSession();

  return (
    <Stack
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
    >
      <Paper sx={{ p: 2, width: "60%", height: "60%" }}>
        <Grid container width="100%" height="100%">
          <Grid item xs={12}>
            <Typography variant="h4" textAlign="center">
              {session?.user?.name}&apos;s Profile
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Stack>
  );
}

import React from "react";
import { Stack, Paper, Typography, Grid } from "@mui/material";
import { useSession } from "next-auth/react";
import { getUser } from "../../graphql/queries";
import { useQuery } from "@apollo/client";

export default function CompleteProfile() {
  const { data: session } = useSession();
  const { data } = useQuery(getUser, { fetchPolicy: "no-cache" });

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
              Complete {session?.user?.name}&apos;s Profile
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Stack>
  );
}

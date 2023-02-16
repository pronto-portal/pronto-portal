import React from "react";
import { Wrapper } from "../../types/Wrapper";
import { Grid } from "@mui/material";
import { NavBar } from "../NavBar/NavBar";
import { useSession } from "next-auth/react";

export const AuthorizedGridLayout: React.FC<Wrapper> = ({ children }) => {
  const session = useSession();
  return (
    <Grid
      container
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "primary.light",
      }}
    >
      {session && (
        <Grid item xs={12}>
          <NavBar />
        </Grid>
      )}
      <Grid item xs={12}>
        {children}
      </Grid>
    </Grid>
  );
};

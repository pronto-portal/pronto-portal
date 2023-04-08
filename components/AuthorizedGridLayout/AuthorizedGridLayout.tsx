import React from "react";
import { Wrapper } from "../../types/Wrapper";
import { Stack } from "@mui/material";
import { NavBar } from "../NavBar";

export const AuthorizedGridLayout: React.FC<Wrapper> = ({ children }) => {
  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "primary.light",
      }}
    >
      <NavBar />
      {children}
    </Stack>
  );
};

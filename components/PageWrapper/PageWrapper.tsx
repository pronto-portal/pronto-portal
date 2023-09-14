import React from "react";
import { Wrapper } from "../../types/PropTypes/Wrapper";
import { Box } from "@mui/material";

export const PageWrapper: React.FC<Wrapper> = ({ children }) => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
      }}
    >
      {children}
    </Box>
  );
};

import { useMemo } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ErrorIcon from "@mui/icons-material/Error";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";

interface MetricLoadingStatesProps {
  isError: boolean;
  isLoading: boolean;
  children: React.ReactNode;
}

export const MetricLoadingStates: React.FC<MetricLoadingStatesProps> = ({
  isError,
  isLoading,
  children,
}) => {
  return (
    <Stack
      width="100%"
      height="100%"
      alignItems="center"
      justifyContent="center"
      direction="column"
      spacing={2}
      sx={isError ? { backgroundColor: "error.main" } : {}}
    >
      {isError && (
        <>
          <ErrorIcon sx={{ color: "#fff" }} />
          <Typography sx={{ color: "#fff" }}>Error fetching data</Typography>
        </>
      )}
      {isLoading && <CircularProgress />}
      {!isLoading && !isError ? children : null}
    </Stack>
  );
};

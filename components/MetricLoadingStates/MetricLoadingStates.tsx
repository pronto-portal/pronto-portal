import { useMemo } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ErrorIcon from "@mui/icons-material/Error";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import Warning from "@mui/icons-material/Warning";

interface MetricLoadingStatesProps {
  isEmpty: boolean;
  isError: boolean;
  isLoading: boolean;
  children: React.ReactNode;
}

export const MetricLoadingStates: React.FC<MetricLoadingStatesProps> = ({
  isEmpty,
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
      sx={isError ? { backgroundColor: "#fff" } : {}}
    >
      {isLoading ? (
        <CircularProgress />
      ) : isError ? (
        <>
          <ErrorIcon sx={{ color: "error.main" }} />
          <Typography sx={{ color: "error.main" }}>
            Error fetching data
          </Typography>
        </>
      ) : isEmpty ? (
        <>
          <Warning sx={{ color: "warning.main" }} />
          <Typography sx={{ color: "warning.main" }}>
            No data available
          </Typography>
        </>
      ) : null}
      {!isLoading && !isError && !isEmpty ? children : null}
    </Stack>
  );
};

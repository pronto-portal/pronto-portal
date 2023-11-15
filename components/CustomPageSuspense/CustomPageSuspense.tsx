import React from "react";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

interface CustomPageSuspenseProps {
  isLoading: boolean;
  children: React.ReactNode;
}

export const CustomPageSuspense: React.FC<CustomPageSuspenseProps> = ({
  isLoading,
  children,
}) => {
  return isLoading ? (
    <Stack
      width="100%"
      height="100%"
      direction="column"
      justifyContent="space-between"
      alignItems="center"
    >
      <LinearProgress sx={{ width: "100%" }} />
      <Box padding={2} flex={1} width="100%" height="100%">
        <Skeleton variant="rectangular" width="100%" height="100%" />
      </Box>
    </Stack>
  ) : (
    <>{children}</>
  );
};

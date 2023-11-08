import React from "react";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";

const Subscribe: React.FC = () => {
  const theme = useTheme();
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
      <Paper
        sx={{
          width: "60%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          borderRadius: "50px",
        }}
      >
        <Box
          sx={{
            backgroundColor: theme.palette.primary.dark,
            borderTopLeftRadius: "50px",
            borderTopRightRadius: "50px",
          }}
          width="100%"
          padding={1}
        >
          <Typography variant="h4" color="#fff" textAlign="center">
            Your subscriptions
          </Typography>
        </Box>
        <Stack
          width="100%"
          height="100%"
          padding={1}
          sx={{ overflowY: "scroll" }}
          direction="column"
          spacing={2}
          alignItems="center"
          justifyContent="flex-start"
        ></Stack>
      </Paper>
    </Stack>
  );
};

export default Subscribe;

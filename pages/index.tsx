import { Stack, Typography } from "@mui/material";

export default function Home() {
  return (
    <Stack
      direction="column"
      spacing={2}
      justifyContent="center"
      alignItems="center"
      sx={{ width: "100%", height: "100%", backgroundColor: "primary.light" }}
    >
      <Typography textAlign="center" variant="h2">
        Home
      </Typography>
    </Stack>
  );
}

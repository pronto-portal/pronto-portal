import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

export default function Home() {
  return (
    <Stack
      direction="column"
      width="100%"
      height="100%"
      alignItems="center"
      justifyContent="center"
      p={2}
    >
      <Accordion sx={{ width: "100%" }}>
        <AccordionSummary>
          <Typography variant="h5">Translators</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container width="100%" height="100%">
            <Grid
              item
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              xs={2}
            ></Grid>
            <Grid item xs={10}></Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
}

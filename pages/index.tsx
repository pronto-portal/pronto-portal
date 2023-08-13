import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { TranslatorDirectory } from "../components/TranslatorDirectory";

export default function Home() {
  // Gets the current user and caches it for other components to use
  return (
    <Stack
      direction="column"
      width="100%"
      height="100%"
      alignItems="center"
      justifyContent="flex-start"
      p={2}
    >
      <TranslatorDirectory />
    </Stack>
  );
}

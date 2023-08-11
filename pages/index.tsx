import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Collapsable } from "../components/Collapsable";
import { TranslatorDirectory } from "../components/TranslatorDirectory";

export default function Home() {
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

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { User } from "../types/User";
import { TranslatorCards } from "../components/TranslatorCards";

const users: User[] = [
  {
      id: "f4e7daa1-a2f8-4142-8c3a-4b6e830e38a6",
      createdAt: new Date(),
      updatedAt: new Date(),
      isManager: false,
      isTranslator: true,
      isBanned: false,
      email: "example1@email.com",
      phone: "123-456-7890",
      firstName: "John",
      lastName: "Doe",
      profilePic: "",
      isProfileComplete: false,
      city: "Los Angeles",
      state: "CA",
      languages: ["English", "Spanish"]
  },
  {
      id: "1c5b8a12-e5f5-4b6c-b8bf-45d9051d9885",
      createdAt: new Date(),
      updatedAt: new Date(),
      email: "example2@email.com",
      isManager: false,
      isTranslator: true,
      isBanned: false,
      phone: "123-456-7890",
      firstName: "Jane",
      lastName: "Smith",
      profilePic: "https://path-to-image.jpg",
      isProfileComplete: true,
      city: "New York",
      state: "NY",
      languages: ["English"]
  }
];

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
            <Grid item xs={10} sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", rowGap: 1}}>
              <TranslatorCards users={users} />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
}

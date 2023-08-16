import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { User } from "../types/User";
import { TranslatorDirectory } from "../components/TranslatorDirectory";

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

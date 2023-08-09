import React from "react";
import { User } from "../../types/User";
import Stack from "@mui/material/Stack";
import { TranslatorCard } from "../TranslatorCard/TranslatorCard";

interface TranslatorCardsProps {
    users: User[];
}

export const TranslatorCards: React.FC<TranslatorCardsProps> = ({users}) => {
    return <Stack direction="column" justifyContent="flex-start" spacing={1} alignItems="center">
        {
            users.map((user) => (<TranslatorCard user={user} key={`translator${user.id}card`} />))
        }
    </Stack>
}
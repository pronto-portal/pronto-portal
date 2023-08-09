import React from "react";
import { User } from "../../types/User";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";

interface TranslatorCardProps {
    user: User;
}

export const TranslatorCard: React.FC<TranslatorCardProps> = ({user}) => {
    return <Card >
        <CardHeader title={<Typography>{user.firstName + ' ' + user.lastName}</Typography>} />
        <CardContent>
            { user.email } 
        </CardContent>
    </Card>
}
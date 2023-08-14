import React from "react";
import { User } from "../../types/User";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import { useTheme } from '@mui/material/styles';

interface TranslatorCardProps {
    user: User;
}

export const TranslatorCard: React.FC<TranslatorCardProps> = ({user}) => {
    const theme = useTheme();
    return (                                                                                           //auto?
        <Card sx={{ border: (theme) => `.05rem solid ${theme.palette.primary.main}` }} style={{ width: "200%", borderRadius: "2rem", display: "flex", flexDirection: "row", alignItems: "center" }}>
            <img src={user.profilePic} alt="Profile" style={{ width: "2.2rem", height: "2.2rem", borderRadius: "50%", marginLeft: "1.5rem", marginRight: "0.5rem" }}/>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", marginLeft: "0.5rem" }}>
                <CardHeader style={{ padding: ".5rem 1rem 0rem"}} title={<Typography style={{ fontSize: "1rem" }}>{user.firstName + ' ' + user.lastName}</Typography>} />
                <CardContent style={{ padding: "0rem 1rem 0rem"}}>
                    <Typography style={{ fontSize: "0.75rem" }}>{user.email}</Typography>
                </CardContent>
                <CardContent style={{ padding: "0rem 1rem .5rem"}}>
                    <Typography style={{ fontSize: "0.75rem" }}>{user.phone}</Typography>
                </CardContent>
            </div>
        </Card>
    );
}

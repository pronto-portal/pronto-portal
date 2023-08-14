import React from "react";
import { User } from "../../types/User";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { useState } from 'react';

interface TranslatorCardProps {
    user: User;
}

export const TranslatorCard: React.FC<TranslatorCardProps> = ({user}) => {
    const theme = useTheme();
    const [isFavorited, setIsFavorited] = useState(false);

    return (
        <Card sx={{ border: (theme) => `.05rem solid ${theme.typography.allVariants.color}` }} style={{ width: "125%", borderRadius: "2rem", display: "flex", flexDirection: "row", alignItems: "center" }}>
            <img src={user.profilePic} alt="Profile" style={{ width: "2.2rem", height: "2.2rem", borderRadius: "50%", marginLeft: "1.5rem", marginRight: "0.5rem" }}/>
            <div style={{ flex: .5, display: "flex", flexDirection: "column", justifyContent: "space-between", marginLeft: "0.5rem" }}>
                <CardHeader style={{ padding: ".5rem 0rem 0rem"}} title={<Typography style={{ fontSize: "1rem" }}>{user.firstName + ' ' + user.lastName}</Typography>} />
                <CardContent style={{ padding: "0rem 0rem 0rem"}}>
                    <Typography style={{ fontSize: "0.75rem" }}>{user.email}</Typography>
                </CardContent>
                <CardContent style={{ padding: "0rem 0rem .5rem"}}>
                    <Typography style={{ fontSize: "0.75rem" }}>{user.phone}</Typography>
                </CardContent>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", flex: 1, alignItems: "center", marginLeft: "2rem" }}>
                <RateReviewIcon style={{ color: theme.typography.allVariants.color }} />
                <StarIcon style={{ color: theme.typography.allVariants.color }} />
                <Button 
                    variant="contained" 
                    sx={{
                        background: theme.typography.allVariants.color, 
                        marginRight: "-2.5rem", 
                        marginLeft: "0rem",
                        color: "white",
                        textTransform: "none",
                        fontSize: "0.8rem",
                        borderRadius: "2rem"
                    }}>
                    Assign
                </Button>
                <Button onClick={() => setIsFavorited(!isFavorited)}>
                    {isFavorited ? <StarIcon style={{ color: 'gold' }} /> : <StarBorderIcon style={{ color: theme.typography.allVariants.color }} />}
                </Button>
            </div>
        </Card>
    );
}

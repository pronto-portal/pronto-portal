import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Role } from "../../types/ObjectTypes";
import { firstCharToUpper } from "../../utils/firstCharToUpper";
import { formatCurrency } from "../../utils/formatCurrency";

interface SubscriptionCardProps {
  role: Role;
}

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ role }) => {
  const { name, description, priceCents } = role;
  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <CardHeader
        title={
          <Typography variant="h5" textAlign="center">
            {firstCharToUpper(name)}
          </Typography>
        }
      />
      <CardContent>
        <Typography variant="body1" textAlign="center">
          {description}
        </Typography>
        <Typography variant="body1" textAlign="center">
          {formatCurrency(priceCents)}
        </Typography>
      </CardContent>
      <CardActionArea>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ padding: "1rem" }}
        >
          <Button variant="contained" color="primary">
            Subscribe
          </Button>
        </Stack>
      </CardActionArea>
    </Card>
  );
};

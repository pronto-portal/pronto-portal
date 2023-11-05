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
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useStripeProvider } from "../../contextProviders/StripeProvider";

interface SubscriptionCardProps {
  role: Role;
}

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ role }) => {
  const { name, description, priceCents, features, stripePriceId } = role;
  console.log(role);

  const { createCheckoutSession } = useStripeProvider();

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

        <List>
          {features.map((feature) => (
            <ListItem key={`${name}${feature}`}>
              <ListItemText primary={<Typography>{feature}</Typography>} />
            </ListItem>
          ))}
        </List>
      </CardContent>
      <CardActionArea>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ padding: "1rem" }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => createCheckoutSession(stripePriceId)}
            disabled={!stripePriceId}
          >
            Subscribe
          </Button>
        </Stack>
      </CardActionArea>
    </Card>
  );
};

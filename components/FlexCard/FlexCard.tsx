import { styled } from "@mui/system";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export const FlexCard = styled(Card)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "start",
});

export const FlexCardContent = styled(CardContent)({
  height: "100%",
});

import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";

interface MetricProps {
  titleText: string;
  children: React.ReactNode;
}

export const Metric: React.FC<MetricProps> = ({ titleText, children }) => {
  return (
    <Card sx={{ width: "100%", height: "100%" }}>
      <CardHeader
        sx={{
          padding: "0.5rem",
        }}
        title={
          <Typography fontWeight="bold" textAlign="center">
            {titleText}
          </Typography>
        }
      />
      <CardContent sx={{ width: "100%", height: "100%" }}>
        {children}
      </CardContent>
    </Card>
  );
};

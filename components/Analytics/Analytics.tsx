import React from "react";
import Grid from "@mui/material/Grid";
import { Metric } from "../Metric";
import ThisMonthVsLastMonthAssignments from "../Metrics/ThisMonthVsLastMonthAssignments";

export const Analytics: React.FC = () => {
  console.log("Analytics");
  return (
    <Grid
      container
      direction="row"
      flexWrap="wrap"
      rowGap={2}
      columnGap={2}
      width="100%"
      height="100%"
    >
      <Grid item height="50%">
        <Metric titleText="Assignments This Month vs Last Month">
          <ThisMonthVsLastMonthAssignments />
        </Metric>
      </Grid>
    </Grid>
  );
};

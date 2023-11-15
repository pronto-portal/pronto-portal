import React from "react";
import Grid from "@mui/material/Grid";
import { Metric } from "../Metric";
import ThisMonthVsLastMonthAssignments from "../Metrics/ThisMonthVsLastMonthAssignments";
import { AssignmentsStatusComparison } from "../Metrics/AssignmentsStatusComparison";
import LanguagesPerAssignmentLocation from "../Metrics/LanguagesPerAssignmentLocation";
import TranslatorNoShowToCompletionRatio from "../Metrics/TranslatorNoShowToCompletionRatio";

export const Analytics: React.FC = () => {
  const gridBreakPoints = {
    xs: 12,
    sm: 6,
    md: 6,
    lg: 6,
    xl: 6,
  };

  return (
    <Grid
      container
      direction="row"
      flexWrap="wrap"
      width="100%"
      height="100%"
      spacing={2}
    >
      <Grid item height="50%" {...gridBreakPoints}>
        <Metric titleText="Assignments This Month vs Last Month">
          <ThisMonthVsLastMonthAssignments />
        </Metric>
      </Grid>
      <Grid item height="50%" {...gridBreakPoints}>
        <Metric titleText="Assignment Completion">
          <AssignmentsStatusComparison />
        </Metric>
      </Grid>
      <Grid item height="50%" {...gridBreakPoints}>
        <Metric titleText="Languages Per Assignment Location">
          <LanguagesPerAssignmentLocation />
        </Metric>
      </Grid>

      <Grid item height="50%" {...gridBreakPoints}>
        <Metric titleText="Top 10 Translator Assignment Statistics">
          <TranslatorNoShowToCompletionRatio />
        </Metric>
      </Grid>
    </Grid>
  );
};

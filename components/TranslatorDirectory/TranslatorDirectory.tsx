import React from "react";
import { Collapsable } from "../Collapsable";
import Grid from "@mui/material/Grid";

export const TranslatorDirectory: React.FC = () => {
  return (
    <Collapsable title="Translators" sx={{ width: "100%" }}>
      <Grid container direction="column" sx={{ width: "100%" }}>
        <Grid item sx={{ width: "100%" }} xs={2}></Grid>
        <Grid item sx={{ width: "100%" }} xs={10}>
          {" "}
        </Grid>
      </Grid>
    </Collapsable>
  );
};

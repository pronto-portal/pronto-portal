import React from "react";
import { Collapsable } from "../Collapsable";
import Grid from "@mui/material/Grid";
import { TranslatorDirectorySearch } from "./TranslatorDirectorySearch";
import { useGetTranslatorsQuery } from "../../redux/reducers/apiReducer";

export const TranslatorDirectory: React.FC = () => {
  const { data: translators } = useGetTranslatorsQuery({
    page: 1,
    countPerPage: 10,
  });

  return (
    <Collapsable title="Translators" sx={{ width: "100%" }}>
      <Grid container direction="column" sx={{ width: "100%" }}>
        <Grid item sx={{ width: "100%" }} xs={2}>
          <TranslatorDirectorySearch />
        </Grid>
        <Grid item sx={{ width: "100%" }} xs={10}>
          {" "}
        </Grid>
      </Grid>
    </Collapsable>
  );
};

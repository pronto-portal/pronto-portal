import React, { useState } from "react";
import { Collapsable } from "../Collapsable";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import { TranslatorDirectorySearch } from "./TranslatorDirectorySearch";
import { useGetTranslatorsQuery } from "../../redux/reducers/apiReducer";
import Pagination from "@mui/material/Pagination";

export const TranslatorDirectory: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const countPerPage = 10;
  const { data } = useGetTranslatorsQuery({
    page: 1,
    countPerPage,
  });

  return (
    <Collapsable title="Translators" sx={{ width: "100%" }}>
      {data && data.getTranslators ? (
        <Grid container direction="column" sx={{ width: "100%" }}>
          <Grid item sx={{ width: "100%" }} xs={2}>
            <TranslatorDirectorySearch
              translators={data.getTranslators.translators}
            />
          </Grid>
          <Grid item sx={{ width: "100%" }} xs={9}>
            {" "}
          </Grid>
          <Grid item sx={{ width: "100%" }} xs={1}>
            <Pagination
              page={page}
              onChange={(_, page) => setPage(page)}
              count={data.getTranslators.totalRowCount / countPerPage}
            />
          </Grid>
        </Grid>
      ) : (
        <LinearProgress sx={{ width: "100%" }} />
      )}
    </Collapsable>
  );
};

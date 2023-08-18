import React from "react";
import { Collapsable } from "../Collapsable";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import { TranslatorDirectorySearch } from "./TranslatorDirectorySearch";
import { useFilteredTranslators } from "../../contextProviders/FilteredTranslatorsProvider";
import TablePagination from "@mui/material/TablePagination";

export const TranslatorDirectory: React.FC = () => {
  const {
    translators,
    isLoading,
    page,
    setPage,
    totalRowCount,
    countPerPage,
    setCountPerPage,
  } = useFilteredTranslators();

  console.log(isLoading);
  console.log(translators);
  return (
    <Collapsable title="Translators" sx={{ width: "100%" }}>
      {!isLoading && translators ? (
        <Grid container direction="column" sx={{ width: "100%" }}>
          <Grid item sx={{ width: "100%" }} xs={2}>
            <TranslatorDirectorySearch translators={translators} />
          </Grid>
          <Grid item sx={{ width: "100%" }} xs={9}>
            {" "}
          </Grid>
          <Grid item sx={{ width: "100%" }} xs={1}>
            <TablePagination
              component="div"
              page={page}
              onPageChange={(_, page) => setPage(page)}
              count={totalRowCount}
              rowsPerPage={countPerPage}
              onRowsPerPageChange={(e) =>
                setCountPerPage(parseInt(e.target.value, 10))
              }
            />
          </Grid>
        </Grid>
      ) : (
        <LinearProgress sx={{ width: "100%" }} />
      )}
    </Collapsable>
  );
};

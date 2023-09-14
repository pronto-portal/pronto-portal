import React from "react";
import { Collapsable } from "../Collapsable";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import { AssignmentsDirectorySearch } from "./AssignmentsDirectorySearch";
// import { useFilteredAssignments } from "../../contextProviders/FilteredAssignmentsProvider";
import TablePagination from "@mui/material/TablePagination";
import { useFilteredAssignments } from "../../contextProviders/FilteredAssignmentsProvider/FilteredAssignmentsProvider";

export const AssignmentDirectory: React.FC = () => {
  const {
    assignments,
    isLoading,
    page,
    setPage,
    totalRowCount,
    countPerPage,
    setCountPerPage,
  } = useFilteredAssignments();

  // todo: Get rid of duplicate code in TranslatorDirectory and AssignmentDirectory

  return (
    <Collapsable title="Assignments" sx={{ width: "100%" }}>
      {!isLoading && assignments ? (
        <Grid container direction="column" sx={{ width: "100%" }}>
          <Grid item sx={{ width: "100%" }} xs={2}>
            <AssignmentsDirectorySearch />
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

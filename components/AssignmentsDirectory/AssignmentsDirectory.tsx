import React from "react";
import { Collapsable } from "../Collapsable";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import { AssignmentsDirectorySearch } from "./AssignmentsDirectorySearch";
// import { useFilteredAssignments } from "../../contextProviders/FilteredAssignmentsProvider";
import TablePagination from "@mui/material/TablePagination";
import { useFilteredAssignments } from "../../contextProviders/FilteredAssignmentsProvider/FilteredAssignmentsProvider";
import { ModelDirectoryLayout } from "../ModelDirectoryLayout";

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
    <ModelDirectoryLayout
      titleText="Assignments"
      tableProps={{
        data: assignments,
        omitFields: ["id", "createdBy"],
        expandObjectDepth: 1,
        expandObjects: true,
      }}
      isLoading={isLoading}
      page={page}
      setPage={setPage}
      totalRowCount={totalRowCount}
      countPerPage={countPerPage}
      setCountPerPage={setCountPerPage}
      renderFilters={<AssignmentsDirectorySearch />}
    />
  );
};

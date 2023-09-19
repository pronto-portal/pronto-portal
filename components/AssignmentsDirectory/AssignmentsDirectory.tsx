import React from "react";
import { AssignmentsDirectorySearch } from "./AssignmentsDirectorySearch";
import { useFilteredAssignments } from "../../contextProviders/FilteredAssignmentsProvider/FilteredAssignmentsProvider";
import { ModelDirectoryLayout } from "../ModelDirectoryLayout";
import { Assignment } from "../../types/ObjectTypes";

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

  return (
    <ModelDirectoryLayout<Assignment>
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

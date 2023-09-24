import React from "react";
import { AssignmentsDirectorySearch } from "./AssignmentsDirectorySearch";
import { useFilteredAssignments } from "../../contextProviders/FilteredAssignmentsProvider/FilteredAssignmentsProvider";
import { ModelDirectoryLayout } from "../ModelDirectoryLayout";
import { Assignment, Translator } from "../../types/ObjectTypes";
import { ModelNestedRowActionsProps } from "../ModelNestedRowActions";
import { useAssignmentWrite } from "../../contextProviders/AssignmentWriteProvider/AssignmentWriteProvider";
import { NestedRowActions } from "../../types/PropTypes/ModelTableProps";

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

  const { setIsChangeTranslatorOpen } = useAssignmentWrite();

  const nestedRowActions: NestedRowActions<Assignment> = (rowData) => ({
    assignedTo: (
      <ModelNestedRowActionsProps<Translator>
        onEditClick={() => {
          setIsChangeTranslatorOpen(true);
        }}
        datum={rowData.assignedTo as Translator}
      />
    ),
  });

  return (
    <ModelDirectoryLayout<Assignment>
      titleText="Assignments"
      tableProps={{
        data: assignments,
        omitFields: ["id", "createdBy", "assignedTo"],
        omitExpandFields: ["assignedToUser"],
        expandObjectDepth: 1,
        expandObjects: true,
        nestedRowActions,
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

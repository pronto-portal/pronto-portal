import React, { useState } from "react";
import { AssignmentsDirectorySearch } from "./AssignmentsDirectorySearch";
import { useFilteredAssignments } from "../../contextProviders/FilteredAssignmentsProvider/FilteredAssignmentsProvider";
import { ModelDirectoryLayout } from "../ModelDirectoryLayout";
import { Assignment, Translator } from "../../types/ObjectTypes";
import { ModelNestedRowActionsProps } from "../ModelNestedRowActions";
import { useAssignmentWrite } from "../../contextProviders/AssignmentWriteProvider/AssignmentWriteProvider";
import { NestedRowActions } from "../../types/PropTypes/ModelTableProps";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { AddAssignmentFlowProvider } from "../../contextProviders/AddAssignmentFlowProvider";
import { AddAssignmentsForm } from "./AddAssignmentForm";

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
  const [openAddAssignmentsForm, setOpenAddAssignmentsForm] =
    useState<boolean>(false);

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
    <>
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
        actions={
          <Stack direction="row" justifyContent="flex-end" width="100%">
            <Button
              variant="contained"
              onClick={() => setOpenAddAssignmentsForm(true)}
            >
              Add Assignment
            </Button>
          </Stack>
        }
        renderFilters={<AssignmentsDirectorySearch />}
      />
      <AddAssignmentFlowProvider>
        <AddAssignmentsForm
          open={openAddAssignmentsForm}
          handleClose={() => setOpenAddAssignmentsForm(false)}
        />
      </AddAssignmentFlowProvider>
    </>
  );
};

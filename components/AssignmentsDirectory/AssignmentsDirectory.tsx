import React, { useState } from "react";
import { AssignmentsDirectorySearch } from "./AssignmentsDirectorySearch";
import { useFilteredAssignments } from "../../contextProviders/FilteredAssignmentsProvider/FilteredAssignmentsProvider";
import { ModelDirectoryLayout } from "../ModelDirectoryLayout";
import {
  Address,
  Assignment,
  Claimant,
  Translator,
} from "../../types/ObjectTypes";
import { ModelNestedRowActionsProps } from "../ModelNestedRowActions";
import { useAssignmentWrite } from "../../contextProviders/AssignmentWriteProvider/AssignmentWriteProvider";
import { NestedRowActions } from "../../types/PropTypes/ModelTableProps";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { AddAssignmentFlowProvider } from "../../contextProviders/AddAssignmentFlowProvider";
import { AddAssignmentsForm } from "./AddAssignmentForm";
import { dateToString } from "../../utils/dateFormat";
import Checkbox from "@mui/material/Checkbox";
import { StaticCheckbox } from "../StaticCheckbox";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { EditAssignmentForm } from "../EditAssignmentForm";

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

  const {
    setIsChangeTranslatorOpen,
    setIsChangeClaimantOpen,
    setIsChangeAddressOpen,
    setAssignment,
  } = useAssignmentWrite();
  const [openAddAssignmentsForm, setOpenAddAssignmentsForm] =
    useState<boolean>(false);

  const nestedRowActions: NestedRowActions<Assignment> = (rowData) => ({
    assignedTo: (
      <ModelNestedRowActionsProps<Translator>
        onEditClick={() => {
          setIsChangeTranslatorOpen(true);
          setAssignment(rowData);
        }}
        datum={rowData.assignedTo as Translator}
      />
    ),
    claimant: (
      <ModelNestedRowActionsProps<Claimant>
        onEditClick={() => {
          setIsChangeClaimantOpen(true);
          setAssignment(rowData);
        }}
        datum={rowData.claimant as Claimant}
      />
    ),
    address: (
      <ModelNestedRowActionsProps<Address>
        onEditClick={() => {
          setIsChangeAddressOpen(true);
          setAssignment(rowData);
        }}
        datum={rowData.address as Address}
      />
    ),
  });

  const [isEditAssignmentOpen, setIsEditAssignmentOpen] =
    useState<boolean>(false);
  const [editingAssignment, setEditingAssignment] = useState<Assignment>(
    {} as Assignment
  );

  console.log(editingAssignment);
  return (
    <>
      <EditAssignmentForm
        open={isEditAssignmentOpen}
        handleClose={() => {
          setIsEditAssignmentOpen(false);
        }}
        id={editingAssignment.id}
        defaultValues={{
          isComplete: editingAssignment.isComplete,
          translatorNoShow: editingAssignment.translatorNoShow,
          claimantNoShow: editingAssignment.claimantNoShow,
        }}
        onSubmit={() => {
          setIsEditAssignmentOpen(false);
        }}
      />
      <ModelDirectoryLayout<Assignment>
        titleText="Assignments"
        tableProps={{
          data: assignments,
          omitFields: ["id", "createdBy", "assignedTo"],
          omitExpandFields: ["assignedToUser"],
          expandObjectDepth: 1,
          expandObjects: true,
          nestedRowActions,
          rowActions: (data) => (
            <Stack direction="row" spacing={1}>
              <IconButton
                size="small"
                onClick={() => {
                  setEditingAssignment(data);
                  setIsEditAssignmentOpen(true);
                }}
              >
                <EditIcon />
              </IconButton>
            </Stack>
          ),
          fieldFormatters: {
            createdAt: (date) => dateToString(date),
            dateTime: (date) => dateToString(date),
            translatorNoShow: (value) => <StaticCheckbox checked={value} />,
            claimantNoShow: (value) => <StaticCheckbox checked={value} />,
            isComplete: (value) => <StaticCheckbox checked={value} />,
          },
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

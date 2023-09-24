import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import { useFilteredAssignments } from "../../contextProviders/FilteredAssignmentsProvider";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { GetAssignmentsFilter } from "../../types/InputTypes";
import { Box } from "@mui/material";
import { Assignment } from "../../types/ObjectTypes";
import { AddAssignmentsForm } from "./AddAssignmentForm";
import { AddAssignmentFlowProvider } from "../../contextProviders/AddAssignmentFlowProvider";

interface SearchableAssignments extends Assignment {
  label: string;
}

type SearchableAssignmentsKey = keyof GetAssignmentsFilter;
const searchableFields: SearchableAssignmentsKey[] = [
  "address",
  "assignedTo",
  "claimant",
  "date",
  "id",
];

export const AssignmentsDirectorySearch: React.FC = () => {
  const { filters: ctxFilter, setFilters: ctxSetFilter } =
    useFilteredAssignments();

  // I want to be able to have multiple filters and send them back

  const [searchBy, setSearchBy] = useState<SearchableAssignmentsKey>("id");
  const [_, setSearchByValue] = useState<string>("");
  const [openAddAssignmentsForm, setOpenAddAssignmentsForm] =
    useState<boolean>(false);

  useEffect(() => {
    searchableFields.forEach((field) => {
      if (ctxFilter && ctxFilter[field]) {
        setSearchBy(field);
        setSearchByValue(ctxFilter[field] as string);
      }
    });
  }, [ctxFilter]);

  const handleApplyFilters = () => {
    let newFilters: GetAssignmentsFilter = {};

    ctxSetFilter(newFilters);
  };

  return (
    <>
      <Stack
        direction="column"
        justifyContent="space-between"
        spacing={1}
        flexWrap={"nowrap"}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          spacing={1}
          alignItems="center"
        >
          <TextField
            sx={{ flex: 0.25 }}
            select
            defaultValue={searchBy}
            onChange={(e) =>
              setSearchBy(e.target.value as SearchableAssignmentsKey)
            }
            label="Search by"
          >
            {searchableFields.map((field) => (
              <MenuItem
                key={`searchableAssignmentsField${field}`}
                value={field}
              >
                {field}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={1}
        >
          <Button variant="contained" onClick={handleApplyFilters}>
            Apply Filters
          </Button>
          <Button
            variant="contained"
            onClick={() => setOpenAddAssignmentsForm(true)}
          >
            Add Assignments
          </Button>
        </Stack>
      </Stack>
      <AddAssignmentFlowProvider>
        <AddAssignmentsForm
          open={openAddAssignmentsForm}
          handleClose={() => setOpenAddAssignmentsForm(false)}
        />
      </AddAssignmentFlowProvider>
    </>
  );
};

import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import { useFilteredAssignments } from "../../contextProviders/FilteredAssignmentsProvider";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { GetAssignmentsFilter } from "../../types/InputTypes";
import Box from "@mui/material/Box";
import { DateRangePicker } from "../DateRangePicker";
import Autocomplete from "@mui/material/Autocomplete";
import { AddressFilter } from "../AddressFilter";
import { AssignedToFilter } from "../AssignedToFilter";
import { ClaimantFilter } from "../ClaimantFilter";
import { splitCamelCase } from "../../utils/splitCamelCase";
import { firstCharToUpper } from "../../utils/firstCharToUpper";

type SearchableAssignmentsKey = keyof GetAssignmentsFilter;
const searchableFields: SearchableAssignmentsKey[] = [
  "address",
  "assignedTo",
  "claimant",
  "date",
  "id",
];

export const AssignmentsDirectorySearch: React.FC = () => {
  const {
    filters: ctxFilter,
    setFilters: ctxSetFilter,
    assignments,
  } = useFilteredAssignments();

  const [searchBy, setSearchBy] = useState<SearchableAssignmentsKey>("id");
  const [filterValue, setFilterValue] = useState<any>();

  useEffect(() => {
    const searchByKey = Object.keys(
      ctxFilter || {}
    )[0] as SearchableAssignmentsKey;
    if (ctxFilter && searchByKey) {
      setFilterValue(ctxFilter);
      if (searchByKey === "dateRange") {
        setSearchBy("date");
      } else {
        setSearchBy(searchByKey);
      }
    }
  }, [ctxFilter]);

  const handleApplyFilters = () => {
    console.log("filterValue", filterValue);
    ctxSetFilter(filterValue);
  };

  console.log("filterValue", filterValue);
  let RenderFilter = <></>;

  if (searchBy === "date") {
    RenderFilter = (
      <DateRangePicker
        date1Default={ctxFilter?.dateRange?.date1}
        date2Default={ctxFilter?.dateRange?.date2}
        onChange={(date1, date2) => {
          setFilterValue({
            dateRange: {
              date1: date1
                ? typeof date1 === "string"
                  ? new Date(date1)
                  : date1.toISOString()
                : undefined,
              date2: date2
                ? typeof date2 === "string"
                  ? new Date(date2)
                  : date2.toISOString()
                : undefined,
            },
          });
        }}
      />
    );
  } else if (searchBy === "id") {
    RenderFilter = (
      <Autocomplete
        options={assignments.map((assignment) => ({
          ...assignment,
          label: assignment.id,
        }))}
        defaultValue={
          ctxFilter && ctxFilter.id
            ? assignments.find((assignment) => assignment.id === ctxFilter.id)
            : undefined
        }
        getOptionLabel={(option) => option.id}
        renderInput={(params) => <TextField {...params} label="ID" />}
        onChange={(e, value) => {
          if (value) {
            setFilterValue({ id: value.id });
          }
        }}
      />
    );
  } else if (searchBy === "address") {
    RenderFilter = (
      <AddressFilter
        onChange={(address) => setFilterValue({ address })}
        defaultValue={
          ctxFilter && ctxFilter.address
            ? {
                address1: ctxFilter.address.address1,
                address2: ctxFilter.address.address2,
                city: ctxFilter.address.city,
                state: ctxFilter.address.state,
                zipCode: ctxFilter.address.zipCode,
              }
            : undefined
        }
      />
    );
  } else if (searchBy === "assignedTo") {
    RenderFilter = (
      <AssignedToFilter
        onChange={(assignedTo) => setFilterValue({ assignedTo })}
        defaultValue={
          ctxFilter && ctxFilter.assignedTo
            ? {
                firstName: ctxFilter.assignedTo.firstName,
                lastName: ctxFilter.assignedTo.lastName,
                email: ctxFilter.assignedTo.email,
                phone: ctxFilter.assignedTo.phone,
                id: ctxFilter.assignedTo.id,
              }
            : undefined
        }
      />
    );
  } else if (searchBy === "claimant") {
    RenderFilter = (
      <ClaimantFilter
        onChange={(claimant) => setFilterValue({ claimant })}
        defaultValue={
          ctxFilter && ctxFilter.claimant
            ? {
                firstName: ctxFilter.claimant.firstName,
                lastName: ctxFilter.claimant.lastName,
              }
            : undefined
        }
      />
    );
  }

  return (
    <Stack
      direction="row"
      justifyContent="center"
      spacing={1}
      flexWrap={"nowrap"}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        spacing={1}
        alignItems="center"
        flex={0.5}
      >
        <TextField
          fullWidth
          select
          value={searchBy}
          defaultValue={searchBy}
          onChange={(e) =>
            setSearchBy(e.target.value as SearchableAssignmentsKey)
          }
          label="Search by"
        >
          {searchableFields.map((field) => (
            <MenuItem key={`searchableAssignmentsField${field}`} value={field}>
              {firstCharToUpper(splitCamelCase(field))}
            </MenuItem>
          ))}
        </TextField>
      </Stack>
      <Box flex={1}>{RenderFilter}</Box>

      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={1}
        flex={0.5}
      >
        <Button variant="contained" onClick={handleApplyFilters}>
          Apply Filters
        </Button>
      </Stack>
    </Stack>
  );
};

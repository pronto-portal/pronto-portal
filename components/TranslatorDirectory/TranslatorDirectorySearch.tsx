import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import { User } from "../../types/User";
import { useFilteredTranslators } from "../../contextProviders/FilteredTranslatorsProvider";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";

interface TranslatorDirectorySearchProps {
  translators: User[];
}

export const TranslatorDirectorySearch: React.FC<
  TranslatorDirectorySearchProps
> = ({ translators }) => {
  const {
    filter: ctxFilter,
    setFilter: ctxSetFilter,
    filterValue: ctxFilterValue,
    setFilterValue: ctxSetFilterValue,
  } = useFilteredTranslators();

  const translatorFilters = [
    "firstName",
    "lastName",
    "city",
    "state",
    "language",
  ];

  const [filter, setFilter] = useState<string>("language");
  const [filterValue, setFilterValue] = useState<string>("");

  const filteredTranslators = translators
    .filter((translator) => {
      if (filter === "language")
        return translator.languages.includes(filterValue.toLowerCase());

      return translator[filter as keyof User] === filterValue;
    })
    .map(
      ({ firstName, lastName, city, state }) =>
        `${lastName}, ${firstName} - ${city}, ${state}`
    );

  console.log(filteredTranslators);

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      spacing={1}
      alignItems="center"
    >
      <Autocomplete
        freeSolo
        sx={{ flex: 1 }}
        options={filteredTranslators}
        value={filterValue || ""}
        onChange={(_, newValue) => setFilterValue(newValue || "")}
        renderInput={(params) => (
          <TextField
            {...params}
            label={`Filter values by ${filter}`}
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
      />
      <TextField
        sx={{ flex: 1 }}
        select
        value={filter}
        onChange={(e) => setFilterValue(e.target.value)}
        label="Select your filter"
      >
        {translatorFilters.map((filter) => (
          <MenuItem value={filter} key={`translatorFilterSelect${filter}`}>
            {filter}
          </MenuItem>
        ))}
      </TextField>
      <Button variant="contained" sx={{ height: "100%" }}>
        Filter
      </Button>
    </Stack>
  );
};

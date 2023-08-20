import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import { User } from "../../types/User";
import { useFilteredTranslators } from "../../contextProviders/FilteredTranslatorsProvider";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";
import { Typography } from "@mui/material";
import { useLanguages } from "../../contextProviders/LanguagesProvider";
import { useSelectCityState } from "../../hooks/useSelectCityState";
import { GetTranslatorsFilters } from "../../types/inputTypes";

export const TranslatorDirectorySearch: React.FC = () => {
  const {
    translators,
    filters: ctxFilter,
    setFilters: ctxSetFilter,
  } = useFilteredTranslators();

  // I want to be able to have multiple filters and send them back
  const translatorFilters = ["firstName", "lastName"];

  const [filter, setFilter] = useState<string>("language");
  const [filterValue, setFilterValue] = useState<string>("");

  const [selectedLanguages, setSelectedLanguages] = useState<string[]>();
  const { city, setCity, state, setState, stateISOCodes, cities } =
    useSelectCityState();

  useEffect(() => {
    if (ctxFilter.languages) setSelectedLanguages(ctxFilter.languages);

    if (ctxFilter.state) setState(ctxFilter.state);

    if (ctxFilter.city) setCity(ctxFilter.city);
  }, [ctxFilter, setCity, setState]);

  const { languages } = useLanguages();

  const filteredTranslators = translators.filter((translator) => {
    if (filter === "language")
      return translator.languages.includes(filterValue);

    return translator[filter as keyof User] === filterValue;
  });

  const handleApplyFilters = () => {
    let newFilters: GetTranslatorsFilters = {};

    if (selectedLanguages && selectedLanguages.length)
      newFilters.languages = selectedLanguages;

    if (city) newFilters.city = city;

    if (state) newFilters.state = state;

    ctxSetFilter(newFilters);
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      spacing={1}
      alignItems="center"
    >
      <Autocomplete
        multiple
        sx={{ flex: 1 }}
        defaultValue={ctxFilter.languages}
        onChange={(_e, newValue) => setSelectedLanguages(newValue)}
        options={languages}
        renderInput={(params) => <TextField {...params} label="Languages" />}
      />
      <Autocomplete
        value={state}
        defaultValue={ctxFilter.state}
        sx={{ flex: 1 }}
        options={stateISOCodes}
        autoHighlight
        renderInput={(params) => (
          <TextField
            {...params}
            label="State *"
            inputProps={{ ...params.inputProps, maxLength: 10 }}
          />
        )}
        onChange={(_e, newValue) => setState(newValue ?? "")}
      />

      <Autocomplete
        value={city}
        sx={{ flex: 1 }}
        defaultValue={ctxFilter.city}
        disabled={!state}
        options={cities}
        autoHighlight
        onChange={(_e, newValue) => setCity(newValue ?? "")}
        renderInput={(params) => (
          <TextField
            {...params}
            label="City *"
            inputProps={{ ...params.inputProps, maxLength: 85 }}
          />
        )}
      />

      <Button
        variant="contained"
        sx={{ height: "100%" }}
        onClick={handleApplyFilters}
      >
        Filter
      </Button>
    </Stack>
  );
};

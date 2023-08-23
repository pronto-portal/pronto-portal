import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import { User } from "../../types/User";
import { useFilteredTranslators } from "../../contextProviders/FilteredTranslatorsProvider";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useLanguages } from "../../contextProviders/LanguagesProvider";
import { useSelectCityState } from "../../hooks/useSelectCityState";
import { GetTranslatorsFilters } from "../../types/inputTypes";
import { Box } from "@mui/material";
import { TranslatorSearchByOption } from "./TranslatorSearchByOption";
import { AddTranslatorForm } from "./AddTranslatorForm";

interface SearchableTranslator extends User {
  label: string;
}

type SearchableTranslatorKey = keyof GetTranslatorsFilters;
const searchableFields: SearchableTranslatorKey[] = ["phone", "email", "id"];

export const TranslatorDirectorySearch: React.FC = () => {
  const {
    translators,
    filters: ctxFilter,
    setFilters: ctxSetFilter,
  } = useFilteredTranslators();

  // I want to be able to have multiple filters and send them back

  const [searchBy, setSearchBy] = useState<SearchableTranslatorKey>("id");
  const [searchByValue, setSearchByValue] = useState<string>("");
  const [openAddTranslatorForm, setOpenAddTranslatorForm] =
    useState<boolean>(false);

  const [selectedLanguages, setSelectedLanguages] = useState<string[]>();
  const { city, setCity, state, setState, stateISOCodes, cities } =
    useSelectCityState();

  useEffect(() => {
    if (ctxFilter.languages) setSelectedLanguages(ctxFilter.languages);

    if (ctxFilter.state) setState(ctxFilter.state);

    if (ctxFilter.city) setCity(ctxFilter.city);

    searchableFields.forEach((field) => {
      if (ctxFilter[field]) {
        setSearchBy(field);
        setSearchByValue(ctxFilter[field] as string);
      }
    });
  }, [ctxFilter, setCity, setState]);

  const { languages } = useLanguages();

  const handleApplyFilters = () => {
    let newFilters: GetTranslatorsFilters = {};

    if (selectedLanguages && selectedLanguages.length)
      newFilters.languages = selectedLanguages;

    if (city) newFilters.city = city;

    if (state) newFilters.state = state;

    if (searchBy && searchByValue) {
      newFilters[searchBy] = searchByValue as string & string[];
    } else {
      delete newFilters[searchBy];
    }

    ctxSetFilter(newFilters);
  };

  const searchableTranslators: SearchableTranslator[] = translators.map(
    (translator) => ({
      label: `${translator.id} - ${translator.lastName}, ${translator.firstName} - ${translator.phone} - ${translator.email}`,
      ...translator,
    })
  );

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
          <Autocomplete
            sx={{ flex: 1 }}
            onChange={(_e, newValue) => {
              setSearchByValue(newValue ? newValue[searchBy].toString() : "");
            }}
            options={searchableTranslators}
            getOptionLabel={(option) =>
              option[searchBy] ? option[searchBy].toString() : ""
            }
            renderInput={(params) => (
              <TextField {...params} label={`Search by ${searchBy}`} />
            )}
            renderOption={(props, option) => (
              <Box component="li" {...props}>
                <TranslatorSearchByOption translator={option} />
              </Box>
            )}
          />
          <TextField
            sx={{ flex: 0.25 }}
            select
            defaultValue={searchBy}
            onChange={(e) =>
              setSearchBy(e.target.value as SearchableTranslatorKey)
            }
            label="Search by"
          >
            {searchableFields.map((field) => (
              <MenuItem key={`searchableTranslatorField${field}`} value={field}>
                {field}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
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
            renderInput={(params) => (
              <TextField {...params} label="Languages" />
            )}
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
            onClick={() => setOpenAddTranslatorForm(true)}
          >
            Add Translator
          </Button>
        </Stack>
      </Stack>
      <AddTranslatorForm
        open={openAddTranslatorForm}
        handleClose={() => setOpenAddTranslatorForm(false)}
      />
    </>
  );
};

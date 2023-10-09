import React from "react";
import { useLanguages } from "../../contextProviders/LanguagesProvider";
import { Language } from "../../types/ObjectTypes";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { SxProps, Theme } from "@mui/material";

interface LanguagesAutocompleteProps {
  value?: string | string[];
  onChange: (value: string[] | string | undefined) => void;
  multiple?: boolean;
  label: string;
  ref?: React.ForwardedRef<HTMLInputElement>;
  sx?: SxProps<Theme>;
}

export const LanguagesAutocomplete = React.forwardRef(
  (
    {
      value,
      onChange,
      multiple = false,
      label,
      sx,
    }: LanguagesAutocompleteProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const { languageCodes, getLanguageFromCode } = useLanguages();

    return (
      <Autocomplete
        ref={ref}
        multiple={multiple}
        id="tags-standard"
        options={languageCodes}
        getOptionLabel={(option: string) =>
          getLanguageFromCode(option as string)
        }
        value={value}
        sx={sx}
        onChange={(_, value) => {
          if (value) {
            onChange(multiple ? (value as string[]) : (value as string));
          }
        }}
        renderOption={(props, option) => (
          <li {...props} key={option}>
            <Typography>{getLanguageFromCode(option as string)} </Typography>
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            fullWidth
            label={label}
            placeholder={label}
          />
        )}
      />
    );
  }
);

LanguagesAutocomplete.displayName = "LanguagesAutocomplete";
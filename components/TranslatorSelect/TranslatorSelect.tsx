import React, { useState } from "react";
import { useGetNonUserTranslatorsQuery } from "../../redux/reducers/nonUserTranslatorReducer";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { UserInfoAutocompleteOption } from "../UserInfoAutocompleteOption";
import { Translator } from "../../types/ObjectTypes";
import Button from "@mui/material/Button";

interface TranslatorSelectProps {
  onConfirm: (translator: Translator) => void;
  onChange?: (translator: Translator) => void;
  buttonText?: string;
  buttonDisabled?: boolean;
}

export const TranslatorSelect: React.FC<TranslatorSelectProps> = ({
  onConfirm,
  onChange,
  buttonText = "Confirm",
  buttonDisabled = false,
}) => {
  const { data } = useGetNonUserTranslatorsQuery({});
  const [translator, setTranslator] = useState<Translator>();

  const disable = buttonDisabled !== undefined ? buttonDisabled : !translator;

  return (
    <Stack
      direction="column"
      spacing={2}
      alignItems="center"
      justifyContent="space-between"
      width="100%"
      height="100%"
    >
      <Typography variant="h6">Assign to Translator</Typography>
      <Autocomplete
        fullWidth
        options={data?.getNonUserTranslators?.translators || []}
        getOptionLabel={(option) =>
          option ? option.firstName + " " + option.lastName : ""
        }
        renderInput={(params) => (
          <TextField {...params} label="Translator" fullWidth />
        )}
        onChange={(_, newValue) => {
          if (newValue) {
            setTranslator(newValue);

            if (onChange) onChange(newValue);
          }
        }}
        renderOption={(props, option) => (
          <li {...props}>
            <UserInfoAutocompleteOption option={option} />
          </li>
        )}
      />
      <Button
        disabled={buttonDisabled !== undefined ? buttonDisabled : !translator}
        variant="contained"
        onClick={() => {
          if (translator) onConfirm(translator);
        }}
      >
        {buttonText}
      </Button>
    </Stack>
  );
};

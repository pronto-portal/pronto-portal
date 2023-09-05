import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useGetTranslatorsQuery } from "../../redux/reducers";
import TextField from "@mui/material/TextField";
import { UserInfoAutocompleteOption } from "../UserInfoAutocompleteOption";
import { useAddAssignmentFlow } from "../../contextProviders/AddAssignmentFlowProvider";
import { AssignmentFlowForm } from "../../types/PropTypes/AssignmentFlowForm";

export const TranslatorForm: React.FC<AssignmentFlowForm> = ({ onSuccess }) => {
  const { data } = useGetTranslatorsQuery({});
  const { translator, setTranslator } = useAddAssignmentFlow();
  const handleSubmit = () => {
    if (Object.keys(translator).length) {
      onSuccess();
    }
  };

  return (
    <Grid
      container
      direction={"column"}
      spacing={2}
      alignItems="center"
      alignContent="center"
    >
      <Grid item sx={{ width: "100%" }}>
        <Autocomplete
          options={data?.getTranslators?.translators || []}
          getOptionLabel={(option) =>
            option ? option.firstName + " " + option.lastName : ""
          }
          renderInput={(params) => <TextField {...params} label="Translator" />}
          onChange={(_, newValue) => {
            if (newValue) {
              setTranslator(newValue);
            }
          }}
          renderOption={(props, option) => (
            <li {...props}>
              <UserInfoAutocompleteOption option={option} />
            </li>
          )}
        />
      </Grid>
      <Grid item>
        <Button
          variant={"contained"}
          onClick={handleSubmit}
          fullWidth
          disabled={!Object.keys(translator).length}
        >
          Next
        </Button>
      </Grid>
    </Grid>
  );
};

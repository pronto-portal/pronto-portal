import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import { Translator } from "../../types/ObjectTypes";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";

interface TranslatorSearchByOptionProps {
  translator: Translator;
}

export const TranslatorSearchByOption: React.FC<
  TranslatorSearchByOptionProps
> = ({ translator: { id, firstName, lastName, email, phone, languages } }) => {
  return (
    <Stack
      justifyContent="space-between"
      alignItems="flex-start"
      direction="column"
      p={1}
    >
      <Grid container direction="row" spacing={1}>
        <Grid item xs={3}>
          <Typography>{id}</Typography>
        </Grid>

        <Grid item xs={3}>
          <Typography>
            {lastName}, {firstName}
          </Typography>
        </Grid>

        <Grid item xs={3}>
          <Typography>{phone}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography>{email}</Typography>
        </Grid>
      </Grid>
      <Stack
        justifyContent="flex-start"
        alignItems="center"
        direction="row"
        spacing={1}
        flexWrap="wrap"
      >
        {languages.map((language) => (
          <Chip
            label={language}
            variant="filled"
            key={`user-${id}-language-${language}`}
          />
        ))}
      </Stack>
    </Stack>
  );
};

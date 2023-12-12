import React from "react";
import { Person } from "../../types/ObjectTypes";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import EmailIcon from "@mui/icons-material/Email";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import Phone from "phone";
import { useLanguages } from "../../contextProviders/LanguagesProvider";

interface UserInfoAutocompleteOptionProps {
  option: Person;
}

export const UserInfoAutocompleteOption: React.FC<
  UserInfoAutocompleteOptionProps
> = ({ option: { id, firstName, lastName, email, phone, languages } }) => {
  const { getLanguageFromCode } = useLanguages();
  return (
    <Grid container direction="column" spacing={1}>
      <Grid item container xs={4} sx={{ width: "100%" }}>
        <Grid item xs={12}>
          <Typography fontWeight="bold">
            {firstName} {lastName}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            columnGap: 1,
          }}
        >
          <EmailIcon />
          <Typography>{email}</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            columnGap: 1,
          }}
        >
          <PhoneAndroidIcon />
          <Typography>
            {
              Phone(phone.replace(/[\W\D]/g, " "), {
                validateMobilePrefix: false,
              }).phoneNumber
            }
          </Typography>
        </Grid>
      </Grid>
      <Grid
        item
        container
        xs={8}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          rowGap: 1,
          columnGap: 1,
          flexWrap: "wrap",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        {languages.map((language) => (
          <Chip
            label={getLanguageFromCode(language)}
            key={`UserInfoAutocompleteOption-${id}-${language}`}
          />
        ))}
      </Grid>
    </Grid>
  );
};

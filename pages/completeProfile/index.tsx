import React, { useState, useEffect } from "react";
import {
  Stack,
  Paper,
  Typography,
  Grid,
  TextField,
  Autocomplete,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import { getUser } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import { PhoneResult, phone } from "phone";
import { User } from "../../types/User";
import { State, City } from "country-state-city";
import { useLanguages } from "../../providers/LanguagesProvider";

export default function CompleteProfile() {
  const { data } = useQuery(getUser);

  const [phoneNumber, setPhoneNumber] = useState<PhoneResult>({
    phoneNumber: "",
    isValid: true,
    countryIso2: "",
    countryIso3: "",
    countryCode: "",
  });
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  // todo: get city and state from browser geolocation
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [isTranslator, setIsTranslator] = useState<boolean>();
  const [isManager, setIsManager] = useState<boolean>();
  const [languages, setLanguages] = useState<string[]>([]);
  const states = State.getStatesOfCountry("US");
  const stateISOCodes: string[] = ["", ...states.map((s) => s.isoCode)];

  const cities: string[] = state
    ? City.getCitiesOfState("US", state).map((city) => city.name)
    : [];

  const { languages: langs } = useLanguages();

  useEffect(() => {
    if (data) {
      const user: User = data.getUser;
      setPhoneNumber(phone(user.phone || ""));
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setCity(user.city);
      setState(user.state);
      setIsTranslator(user.isTranslator);
      setIsManager(user.isManager);
      setLanguages(user.languages);
    }
  }, [data, states]);

  const isPhoneNumberValid = phone(phoneNumber.phoneNumber ?? "").isValid;

  const isInputValid =
    firstName && lastName && city && state && isPhoneNumberValid;

  return (
    <Stack
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
    >
      <Paper sx={{ p: 2, width: "60%", height: "80%" }}>
        <Grid
          container
          width="100%"
          height="100%"
          alignItems="center"
          justifyContent="center"
          direction="column"
        >
          <Grid item xs={2}>
            <Typography variant="h5" textAlign="center">
              Complete Profile
            </Typography>
            <Typography textAlign="center">
              <sub>Required (*)</sub>
            </Typography>
          </Grid>
          <Grid
            item
            container
            xs={9}
            spacing={2}
            justifyItems="center"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={6}>
              <TextField
                label="Phone *"
                value={phoneNumber.phoneNumber}
                fullWidth
                onChange={(e) => setPhoneNumber(phone(e.target.value))}
                error={!isPhoneNumberValid}
                helperText={!isPhoneNumberValid ? "Invalid Phone Number" : " "}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="First Name *"
                value={firstName}
                fullWidth
                inputProps={{ maxLength: 32 }}
                onChange={(e) =>
                  setFirstName(e.target.value.replaceAll(" ", ""))
                }
                error={!firstName}
                helperText={!firstName ? "First name Required" : " "}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Last Name *"
                value={lastName}
                fullWidth
                inputProps={{ maxLength: 32 }}
                onChange={(e) =>
                  setLastName(e.target.value.replaceAll(" ", ""))
                }
                error={!lastName}
                helperText={!lastName ? "Last name Required" : " "}
              />
            </Grid>

            <Grid item xs={6}>
              <Stack
                direction="row"
                justifyContent="start"
                width="100%"
                spacing={1}
              >
                <Autocomplete
                  value={state}
                  options={stateISOCodes}
                  fullWidth
                  autoHighlight
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="State *"
                      inputProps={{ ...params.inputProps, maxLength: 10 }}
                      error={!state}
                      helperText={!state ? "State is required" : " "}
                    />
                  )}
                  onChange={(_e, newValue) => setState(newValue ?? "")}
                />

                {state ? (
                  <Autocomplete
                    value={city}
                    options={cities}
                    fullWidth
                    autoHighlight
                    onChange={(_e, newValue) => setCity(newValue ?? "")}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="City *"
                        inputProps={{ ...params.inputProps, maxLength: 85 }}
                        error={!city}
                        helperText={!city ? "City is required" : " "}
                      />
                    )}
                  />
                ) : null}
              </Stack>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth>
                <FormLabel>Are you a translator?</FormLabel>
                <RadioGroup
                  row
                  value={!!isTranslator ? "yes" : "no"}
                  onChange={(e) => setIsTranslator(e.target.value === "yes")}
                >
                  <FormControlLabel
                    value="yes"
                    label="Yes"
                    control={<Radio />}
                  />
                  <FormControlLabel value="no" label="No" control={<Radio />} />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth>
                <FormLabel>Are you a manager?</FormLabel>
                <RadioGroup
                  row
                  value={!!isManager ? "yes" : "no"}
                  onChange={(e) => setIsManager(e.target.value === "yes")}
                >
                  <FormControlLabel
                    value="yes"
                    label="Yes"
                    control={<Radio />}
                  />
                  <FormControlLabel value="no" label="No" control={<Radio />} />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                multiple
                onChange={(_e, newValue) => setLanguages(newValue)}
                options={langs}
                renderInput={(params) => (
                  <TextField {...params} label="Spoken Languages" />
                )}
              />
            </Grid>
          </Grid>
          <Grid item xs={1}>
            <Button onClick={() => {}} disabled={!isInputValid}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Stack>
  );
}

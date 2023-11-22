import React from "react";
import { useSession } from "next-auth/react";
import { useGetUserQuery } from "../../redux/reducers";
import CircularProgress from "@mui/material/CircularProgress";
import { FlexRowGridItem } from "../../components/FlexRowGridItem";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import { useLanguages } from "../../contextProviders/LanguagesProvider";
import Divider from "@mui/material/Divider";

const JustifiedBetweenGridItem = styled(FlexRowGridItem)(({ theme }) => ({
  justifyContent: "space-between",
}));

export default function Profile() {
  const { data, isLoading } = useGetUserQuery({});
  const { getLanguageFromCode } = useLanguages();

  const user = data ? data.getUser : null;

  return (
    <Stack
      width="100%"
      height="100%"
      justifyContent="flex-start"
      direction="column"
      alignItems="center"
      padding={2}
    >
      {user && !isLoading ? (
        <Grid
          container
          width="60%"
          height="100%"
          direction="column"
          spacing={1}
          wrap="nowrap"
        >
          <Grid item>
            <Typography variant="h4" textAlign="center">
              {`${user.firstName} ${user.lastName}`}&apos;s Profile
            </Typography>
          </Grid>
          <FlexRowGridItem>
            <Divider sx={{ width: "100%" }} />
          </FlexRowGridItem>
          <JustifiedBetweenGridItem>
            <Typography variant="h6">Email:</Typography>
            <Typography variant="body1">{user.email}</Typography>
          </JustifiedBetweenGridItem>
          <FlexRowGridItem>
            <Divider sx={{ width: "100%" }} />
          </FlexRowGridItem>
          <JustifiedBetweenGridItem>
            <Typography variant="h6">Languages:</Typography>
            <Stack direction="row" spacing={1}>
              {user.languages.map((language) => (
                <Chip
                  label={getLanguageFromCode(language)}
                  key={`userProfileLanguage-${language}`}
                />
              ))}
            </Stack>
          </JustifiedBetweenGridItem>
          <FlexRowGridItem>
            <Divider sx={{ width: "100%" }} />
          </FlexRowGridItem>
          <JustifiedBetweenGridItem>
            <Typography variant="h6">Phone:</Typography>
            <Typography variant="body1">{user.phone}</Typography>
          </JustifiedBetweenGridItem>
          <FlexRowGridItem>
            <Divider sx={{ width: "100%" }} />
          </FlexRowGridItem>
          <JustifiedBetweenGridItem>
            <Typography variant="h6">Location:</Typography>
            <Typography variant="body1">
              {user.city}, {user.state}
            </Typography>
          </JustifiedBetweenGridItem>
          <FlexRowGridItem>
            <Divider sx={{ width: "100%" }} />
          </FlexRowGridItem>
          <JustifiedBetweenGridItem>
            <Typography variant="h6">Reminder count this month:</Typography>
            <Typography variant="body1">
              {user.remindersCreatedThisMonth}
            </Typography>
          </JustifiedBetweenGridItem>
          <FlexRowGridItem>
            <Divider sx={{ width: "100%" }} />
          </FlexRowGridItem>
          <JustifiedBetweenGridItem>
            <Typography variant="h6">Translator count:</Typography>
            <Typography variant="body1">{user.translatorsCount}</Typography>
          </JustifiedBetweenGridItem>
          <FlexRowGridItem>
            <Divider sx={{ width: "100%" }} />
          </FlexRowGridItem>
          <JustifiedBetweenGridItem>
            <Typography variant="h6">Is Manager:</Typography>
            <Checkbox
              disabled={true}
              checked={user.isManager}
              sx={{ padding: 0 }}
            />
          </JustifiedBetweenGridItem>
          <FlexRowGridItem>
            <Divider sx={{ width: "100%" }} />
          </FlexRowGridItem>
          <JustifiedBetweenGridItem>
            <Typography variant="h6">Is Translator:</Typography>
            <Checkbox
              disabled={true}
              checked={user.isTranslator}
              sx={{ padding: 0 }}
            />
          </JustifiedBetweenGridItem>
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </Stack>
  );
}

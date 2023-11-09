import React from "react";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { FlexRowGridItem } from "../../../components/FlexRowGridItem";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import styled from "@mui/system/styled";
import { useGetUserQuery } from "../../../redux/reducers";
import CircularProgress from "@mui/material/CircularProgress";

const HorizontalDivider = styled(Divider)(({ theme }) => ({
  width: "100%",
  borderColor: theme.palette.primary.light,
}));

const FlexGridItemCenterItems = styled(FlexRowGridItem)({
  alignItems: "center",
  justifyContent: "space-between",
});

const Subscribe: React.FC = () => {
  const { data, isLoading } = useGetUserQuery({});

  const roleName: React.ReactNode =
    data && data.getUser ? (
      data.getUser.role.name
    ) : (
      <CircularProgress sx={{ height: "100%" }} />
    );
  const monthlyPrice: React.ReactNode =
    data && data.getUser ? (
      data.getUser.role.priceCents / 100
    ) : (
      <CircularProgress sx={{ height: "100%" }} />
    );
  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100%"
      spacing={2}
      paddingTop={3}
      paddingBottom={3}
      paddingLeft={1}
      paddingRight={1}
    >
      <Paper
        sx={{
          width: "60%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          borderRadius: "50px",
        }}
      >
        <Box
          sx={{
            borderTopLeftRadius: "50px",
            borderTopRightRadius: "50px",
          }}
          width="100%"
          paddingTop={2}
        >
          <Typography variant="h5" textAlign="center">
            Manage Subscription
          </Typography>
        </Box>
        <Grid
          container
          direction="column"
          paddingTop={3}
          paddingBottom={3}
          spacing={2}
          width="90%"
          height="100%"
        >
          <FlexGridItemCenterItems>
            <Typography variant="body1" textAlign="right" fontWeight="bold">
              Subscription tier:
            </Typography>
            <Typography variant="body1">{roleName}</Typography>
          </FlexGridItemCenterItems>
          <FlexGridItemCenterItems>
            <HorizontalDivider />
          </FlexGridItemCenterItems>
          <FlexGridItemCenterItems>
            <Typography variant="body1" fontWeight="bold">
              Translators remaining:
            </Typography>
            <Typography variant="body1">0 / 10</Typography>
          </FlexGridItemCenterItems>
          <FlexGridItemCenterItems>
            <HorizontalDivider />
          </FlexGridItemCenterItems>
          <FlexGridItemCenterItems>
            <Typography variant="body1" fontWeight="bold">
              Assignment reminders remaining:
            </Typography>
            <Typography variant="body1">0 / 10</Typography>
          </FlexGridItemCenterItems>
          <FlexGridItemCenterItems>
            <HorizontalDivider />
          </FlexGridItemCenterItems>
          <FlexGridItemCenterItems>
            <Typography variant="body1" fontWeight="bold">
              Monthly Cost:
            </Typography>
            <Typography variant="body1">${monthlyPrice}</Typography>
          </FlexGridItemCenterItems>
          <FlexGridItemCenterItems>
            <HorizontalDivider />
          </FlexGridItemCenterItems>
          <FlexRowGridItem sx={{ justifyContent: "space-around", flex: 0.5 }}>
            <Button variant="contained">Upgrade</Button>
            <Button color="error" variant="contained">
              Cancel subscription
            </Button>
          </FlexRowGridItem>
        </Grid>
      </Paper>
    </Stack>
  );
};

export default Subscribe;

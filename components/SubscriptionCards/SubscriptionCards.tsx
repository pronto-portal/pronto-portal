import React from "react";
import { Role } from "../../types/ObjectTypes";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SubscriptionCard } from "../SubscriptionCard/SubscriptionCard";
import { useGetRolesQuery } from "../../redux/reducers/subscriptionsReducer";
import CircularProgress from "@mui/material/CircularProgress";

export const SubscriptionCards: React.FC = () => {
  const { data, isLoading } = useGetRolesQuery({});

  const roles: Role[] = data && data.getRoles ? data.getRoles : [];

  return (
    <Box
      sx={{
        display: "flex",
        xs: { flexDirection: "column" },
        sm: { flexDirection: "column" },
        md: { flexDirection: "row" },
        lg: { flexDirection: "row" },
        xl: {
          flexDirection: "row",
        },
        alignItems: "center",
        justifyContent: "space-evenly",
        rowGap: "1rem",
        columnGap: "1rem",
      }}
      width="100%"
      height="100%"
    >
      {isLoading ? (
        <CircularProgress />
      ) : (
        roles.map((role) => (
          <Box key={role.name} flex={1}>
            <SubscriptionCard role={role} />
          </Box>
        ))
      )}
    </Box>
  );
};

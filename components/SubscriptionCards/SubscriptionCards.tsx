import React from "react";
import { Role } from "../../types/ObjectTypes";
import Box from "@mui/material/Box";
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
        flexDirection: {
          xs: "column", // flexDirection: 'column' for xs and sm breakpoints
          md: "row", // flexDirection: 'row' for md, lg, and xl breakpoints
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
        roles.map((role) => <SubscriptionCard role={role} key={role.name} />)
      )}
    </Box>
  );
};

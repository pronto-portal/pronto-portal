import React, { useEffect } from "react";
import { Wrapper } from "../../types/PropTypes/Wrapper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { NavBar } from "../NavBar";
import Router, { useRouter } from "next/router";
import { User } from "../../types/ObjectTypes";
import { useGetUserQuery } from "../../redux/reducers";

export const AuthorizedGridLayout: React.FC<Wrapper> = ({ children }) => {
  const { data } = useGetUserQuery({});
  const router = useRouter();

  useEffect(() => {
    if (data && data.getUser) {
      const user: User = data.getUser;
      if (!user.isProfileComplete && router.pathname !== "/login") {
        Router.push("/completeProfile");
      }
    }
  }, [data, router.pathname]);

  return (
    <Stack
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "primary.light",
      }}
    >
      <NavBar
        sx={{
          height: "8vh",
          width: "100%",
        }}
      />
      <Box
        sx={{
          width: "100%",
          height: "92vh",
        }}
      >
        {children}
      </Box>
    </Stack>
  );
};

import React, { useEffect } from "react";
import { Wrapper } from "../../types/Wrapper";
import { Stack } from "@mui/material";
import { NavBar } from "../NavBar";
import { getUser } from "../../graphql/queries";
import Router, { useRouter } from "next/router";
import { User } from "../../types/User";
import { useQuery } from "@apollo/client";

export const AuthorizedGridLayout: React.FC<Wrapper> = ({ children }) => {
  const { data } = useQuery(getUser);
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
        width: "100%",
        height: "100%",
        backgroundColor: "primary.light",
      }}
    >
      <NavBar />
      {children}
    </Stack>
  );
};

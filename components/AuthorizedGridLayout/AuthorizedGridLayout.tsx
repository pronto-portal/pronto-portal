import React, { useEffect, useState } from "react";
import { Wrapper } from "../../types/PropTypes/Wrapper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { NavBar } from "../NavBar";
import Router, { useRouter } from "next/router";
import { User } from "../../types/ObjectTypes";
import { useGetUserQuery } from "../../redux/reducers";
import LinearProgress from "@mui/material/LinearProgress";

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

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    <Stack
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#fff",
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
          overflowY: "auto",
          borderRadius: 0,
        }}
      >
        <Box width="100%" height="100%">
          {loading ? (
            <LinearProgress
              sx={{
                top: 0,
                width: "100%",
              }}
            />
          ) : (
            children
          )}
        </Box>
      </Box>
    </Stack>
  );
};

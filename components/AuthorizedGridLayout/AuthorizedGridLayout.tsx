import React, { useEffect } from "react";
import { Wrapper } from "../../types/Wrapper";
import { Stack } from "@mui/material";
import { NavBar } from "../NavBar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export const AuthorizedGridLayout: React.FC<Wrapper> = ({ children }) => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) router.push("/login");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "primary.light",
      }}
    >
      {session && <NavBar />}
      {children}
    </Stack>
  );
};

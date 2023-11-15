import { Stack, Paper, Typography } from "@mui/material";
import { GoogleLoginButton } from "../../components/GoogleLoginButton";
import { signIn, useSession } from "next-auth/react";
import { Sacramento } from "@next/font/google";
import { useEffect } from "react";
import { useRouter } from "next/router";

const sacramento = Sacramento({
  weight: "400",
  subsets: ["latin"],
});

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) router.push("/");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <Stack
      direction="column"
      spacing={2}
      justifyContent="center"
      alignItems="center"
      sx={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: "primary.light",
      }}
    >
      <Typography
        textAlign="center"
        variant="h2"
        color="#FFF"
        fontFamily={sacramento.style.fontFamily}
      >
        Pronto Portal
      </Typography>
      <Paper
        elevation={2}
        sx={{
          borderRadius: "10px",
          width: "40%",
          height: "40%",
          p: 1,
          position: "relative",
        }}
      >
        <Stack
          justifyContent="flex-start"
          alignItems="center"
          width="100%"
          height="100%"
        >
          <Typography textAlign="center" variant="h4">
            Login
          </Typography>

          <Stack flex={1} justifyContent="center" alignItems="center">
            <GoogleLoginButton
              onClick={() => signIn("google")}
              variant="contained"
            />
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
}

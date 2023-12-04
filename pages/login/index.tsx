import { Stack, Typography, Divider } from "@mui/material";
import { GoogleLoginButton } from "../../components/GoogleLoginButton";
import { signIn } from "next-auth/react";
import Box from "@mui/material/Box";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";

export default function Login() {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  return (
    <Stack
      direction="row"
      sx={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: "primary.light",
      }}
    >
      <Box
        sx={{
          width: "40%",
          height: "100%",
          p: 1,
          position: "relative",
          backgroundColor: "#fff",
        }}
      >
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          spacing={1}
          height="100%"
          width="100%"
        >
          <Typography textAlign="center" variant="h3">
            Pronto Portal
          </Typography>
          <Divider sx={{ width: "75%" }} />
          <Box paddingTop={2}>
            <GoogleLoginButton
              onClick={() =>
                signIn("google", { redirect: false }).then((res) => {
                  if (res)
                    if (res.ok) {
                      router.push("/");
                    } else {
                      console.log(res.error);
                      enqueueSnackbar("Credentials do not match!", {
                        variant: "error",
                      });
                    }
                  else {
                    console.log("Failed to receive signin response");
                  }
                })
              }
              variant="contained"
            />
          </Box>
        </Stack>
      </Box>
      <Box
        sx={{
          width: "60%",
          height: "100%",
          position: "relative",
          backgroundColor: "#fff",
          backgroundImage: "url(/images/busyCity.png)",
        }}
      />
    </Stack>
  );
}

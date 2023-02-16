import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider, useSession } from "next-auth/react";
import { PageWrapper } from "../components/PageWrapper";
import { ThemeProvider } from "@mui/material";
import { theme } from "../theme/theme";
import { Roboto } from "@next/font/google";
import { AuthorizedGridLayout } from "../components/AuthorizedGridLayout/AuthorizedGridLayout";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <main className={roboto.className}>
      <SessionProvider session={session}>
        <ThemeProvider theme={theme}>
          <PageWrapper>
            <AuthorizedGridLayout>
              <Component {...pageProps} />
            </AuthorizedGridLayout>
          </PageWrapper>
        </ThemeProvider>
      </SessionProvider>
    </main>
  );
}

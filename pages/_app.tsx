import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { PageWrapper } from "../components/PageWrapper";
import { ThemeProvider } from "@mui/material";
import { theme } from "../theme/theme";
import { Roboto } from "@next/font/google";
import { AuthorizedGridLayout } from "../components/AuthorizedGridLayout";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

const client = new ApolloClient({
  uri: process.env.API_URL,
  cache: new InMemoryCache(),
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <main className={roboto.className}>
      <SessionProvider session={session}>
        <ApolloProvider client={client}>
          <ThemeProvider theme={theme}>
            <PageWrapper>
              <AuthorizedGridLayout>
                <Component {...pageProps} />
              </AuthorizedGridLayout>
            </PageWrapper>
          </ThemeProvider>
        </ApolloProvider>
      </SessionProvider>
    </main>
  );
}

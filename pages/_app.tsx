import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { PageWrapper } from "../components/PageWrapper";
import { ThemeProvider } from "@mui/material";
import { theme } from "../theme/theme";
import { Roboto } from "@next/font/google";
import { AuthorizedGridLayout } from "../components/AuthorizedGridLayout";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { client } from "../apollo/client";
import { LanguagesProvider } from "../providers/LanguagesProvider";
import { wrapper } from "../redux/store";
import { Provider } from "react-redux";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const {
    pageProps: { session, ...pageProps },
  } = props;

  return (
    <Provider store={store}>
      <main className={roboto.className}>
        <SessionProvider session={session}>
          <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
              <PageWrapper>
                <AuthorizedGridLayout>
                  <LanguagesProvider>
                    <Component {...pageProps} />
                  </LanguagesProvider>
                </AuthorizedGridLayout>
              </PageWrapper>
            </ThemeProvider>
          </ApolloProvider>
        </SessionProvider>
      </main>
    </Provider>
  );
}

export default App;

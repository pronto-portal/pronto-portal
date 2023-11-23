import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { PageWrapper } from "../components/PageWrapper";
import { ThemeProvider } from "@mui/material";
import { theme } from "../theme/theme";
import { AuthorizedGridLayout } from "../components/AuthorizedGridLayout";
import { LanguagesProvider } from "../contextProviders/LanguagesProvider/LanguagesProvider";
import { wrapper } from "../redux/store";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { StripeProvider } from "../contextProviders/StripeProvider";
import React from "react";
import { AnimatedLayout } from "../components/Animated/AnimatedLayout";
import { AnimatedPage } from "../components/Animated/AnimatedPage";
import { useRouter } from "next/router";
import ErrorBoundary from "../components/ErrorBoundary";

function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  const {
    pageProps: { session, ...pageProps },
  } = props;

  const locale = typeof window !== "undefined" ? window.navigator.language : "";

  if (moment.locale() !== locale) {
    moment.locale(locale);
  }

  const router = useRouter();

  return (
    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={locale}>
      <Provider store={store}>
        <SnackbarProvider>
          <SessionProvider session={session}>
            <ThemeProvider theme={theme}>
              <PageWrapper>
                <ErrorBoundary>
                  <AuthorizedGridLayout>
                    <LanguagesProvider>
                      <StripeProvider>
                        <AnimatedLayout>
                          <AnimatedPage key={router.route}>
                            <Component {...pageProps} />
                          </AnimatedPage>
                        </AnimatedLayout>
                      </StripeProvider>
                    </LanguagesProvider>
                  </AuthorizedGridLayout>
                </ErrorBoundary>
              </PageWrapper>
            </ThemeProvider>
          </SessionProvider>
        </SnackbarProvider>
      </Provider>
    </LocalizationProvider>
  );
}

export default App;

import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { PageWrapper } from "../components/PageWrapper";
import { ThemeProvider } from "@mui/material";
import { theme } from "../theme/theme";
import { Roboto } from "@next/font/google";
import { AuthorizedGridLayout } from "../components/AuthorizedGridLayout";
import { LanguagesProvider } from "../contextProviders/LanguagesProvider/LanguagesProvider";
import { wrapper } from "../redux/store";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { StripeProvider } from "../contextProviders/StripeProvider";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

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
    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={locale}>
      <Provider store={store}>
        <SnackbarProvider>
          <main className={roboto.className}>
            <SessionProvider session={session}>
              <ThemeProvider theme={theme}>
                <PageWrapper>
                  <AuthorizedGridLayout>
                    <LanguagesProvider>
                      <StripeProvider>
                        {loading ? (
                          <LinearProgress
                            sx={{
                              width: "100%",
                            }}
                          />
                        ) : (
                          <Component {...pageProps} />
                        )}
                      </StripeProvider>
                    </LanguagesProvider>
                  </AuthorizedGridLayout>
                </PageWrapper>
              </ThemeProvider>
            </SessionProvider>
          </main>
        </SnackbarProvider>
      </Provider>
    </LocalizationProvider>
  );
}

export default App;

import '../styles/globals.css';
import React from 'react';
import { ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import { AnimatedLayout } from '../components/Animated/AnimatedLayout';
import { AnimatedPage } from '../components/Animated/AnimatedPage';
import { AuthorizedGridLayout } from '../components/AuthorizedGridLayout';
import ErrorBoundary from '../components/ErrorBoundary';
import { PageWrapper } from '../components/PageWrapper';
import { LanguagesProvider } from '../contextProviders/LanguagesProvider/LanguagesProvider';
import { StripeProvider } from '../contextProviders/StripeProvider';
import { wrapper } from '../redux/store';
import { theme } from '../theme/theme';

function App({ Component, ...rest }: AppProps) {
    const { store, props } = wrapper.useWrappedStore(rest);

    const {
        pageProps: { session, ...pageProps },
    } = props;

    const locale = typeof window !== 'undefined' ? window.navigator.language : '';

    if (moment.locale() !== locale) {
        moment.locale(locale);
    }

    const router = useRouter();

    return (
        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={locale}>
            <Provider store={store}>
                <SnackbarProvider>
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
                </SnackbarProvider>
            </Provider>
        </LocalizationProvider>
    );
}

export default App;

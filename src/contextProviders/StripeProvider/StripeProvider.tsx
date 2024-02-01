import React, { createContext, useContext, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useSnackbar } from 'notistack';
import { stripeAxiosInstance } from '../../utils/axiosInstances';

interface StripeContextProps {
    createCheckoutSession: (priceId: string) => Promise<void>;
    toggleAutoRenewal: (callback?: () => void) => Promise<void>;
    isToggleAutoRenewalLoading: boolean;
}

interface StripeProviderProps {
    children: React.ReactNode;
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const StripeContext = createContext({} as StripeContextProps);

export const StripeProvider: React.FC<StripeProviderProps> = ({ children }) => {
    const { enqueueSnackbar } = useSnackbar();

    const [isToggleAutoRenewalLoading, setIsToggleAutoRenewalLoading] = useState(false);

    const createCheckoutSession = async (priceId: string) => {
        await stripeAxiosInstance
            .post('/create-checkout-session', {
                priceId,
            })
            .then((res) => {
                if (res && res.data && res.data.checkoutUrl) {
                    window.location.href = res.data.checkoutUrl;
                }
                return res.data;
            })
            .catch((err) => {
                //console.log(err)
            });
    };

    const toggleAutoRenewal = async (callback?: () => void) => {
        setIsToggleAutoRenewalLoading(true);

        await stripeAxiosInstance
            .post('/toggle-autorenewal')
            .then((res) => {
                enqueueSnackbar(res.data.message, { variant: 'success' });
                return res.data;
            })
            .catch((err) => {
                enqueueSnackbar('Error cancelling subscription', { variant: 'error' });
            })
            .finally(() => {
                setIsToggleAutoRenewalLoading(false);
                if (callback) callback();
            });
    };

    return (
        <Elements stripe={stripePromise}>
            <StripeContext.Provider
                value={{
                    createCheckoutSession,
                    toggleAutoRenewal,
                    isToggleAutoRenewalLoading,
                }}
            >
                {children}
            </StripeContext.Provider>
        </Elements>
    );
};

export const useStripeProvider = () => {
    const data = useContext(StripeContext);

    if (!data) throw new Error('useStripe must be used within a StripeProvider component');

    return data;
};

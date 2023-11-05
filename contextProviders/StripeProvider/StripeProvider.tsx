import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { createContext, useContext } from "react";
import { stripeAxiosInstance } from "../../utils/axiosInstances";

interface StripeContextProps {
  createCheckoutSession: (priceId: string) => Promise<void>;
}

interface StripeProviderProps {
  children: React.ReactNode;
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const StripeContext = createContext({} as StripeContextProps);

export const StripeProvider: React.FC<StripeProviderProps> = ({ children }) => {
  const createCheckoutSession = async (priceId: string) => {
    console.log("priceID", priceId);
    await stripeAxiosInstance
      .post("/create-checkout-session", {
        priceId,
      })
      .then((res) => {
        console.log("STRIPE RES", res.data);
        return res.data;
      })
      .catch((err) => console.log(err));
  };
  return (
    <Elements stripe={stripePromise}>
      <StripeContext.Provider value={{ createCheckoutSession }}>
        {children}
      </StripeContext.Provider>
    </Elements>
  );
};

export const useStripeProvider = () => {
  const data = useContext(StripeContext);

  if (!data)
    throw new Error("useStripe must be used within a StripeProvider component");

  return data;
};

import axios from "axios";
import setAuthHeaders from "./setAuthHeaders";

export const stripeAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    ...setAuthHeaders(),
  },
});

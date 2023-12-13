import axios from 'axios';
import setAuthHeaders from './setAuthHeaders';

export const stripeAxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + '/stripe',
    headers: {
        'Content-Type': 'application/json',
        ...setAuthHeaders(),
    },
});

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
        ...setAuthHeaders(),
    },
});

export const axiosInstanceCustomUrl = axios.create({
    headers: {
        'Content-Type': 'application/json',
        ...setAuthHeaders(),
    },
});

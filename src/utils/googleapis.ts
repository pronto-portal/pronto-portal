import { google } from 'googleapis';

// places api
const { places } = google.places({
    version: 'v1',
    auth: process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY,
    key: process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY,
});

export { places };

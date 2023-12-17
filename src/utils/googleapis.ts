import { google } from 'googleapis';

// places api
const { places } = google.places({
    version: 'v1',
    key: process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY,
});

export { places };

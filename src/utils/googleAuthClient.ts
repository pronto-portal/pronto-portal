import { google } from 'googleapis';
export const redirectUri =
    process.env.NODE_ENV === 'production' ? `https://prontotranslationservices.com/api/auth/google/callback` : 'http://localhost:3000/api/auth/google/callback';
const oauth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET_ID, redirectUri);

export default oauth2Client;

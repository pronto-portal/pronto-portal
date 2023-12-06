import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

const redirectUri =
  process.env.NODE_ENV === "production"
    ? `https://prontotranslationservices.com/api/auth/google/callback`
    : "http://localhost:3000/api/auth/google/callback";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET_ID,
  redirectUri
);

// Make sure that we don't parse JSON bodies on this route:
export const config = {
  api: {
    bodyParser: false,
  },
};

const GoogleOAuth = (req: NextApiRequest, res: NextApiResponse) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    response_type: "code",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/user.phonenumbers.read",
    ],
  });

  return res.status(200).json({ url });
};

export default GoogleOAuth;

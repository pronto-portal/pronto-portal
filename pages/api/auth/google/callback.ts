import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";
import axios from "axios";
import { parseSetCookie } from "../../../../utils/parseSetCookie";

const redirectUri =
  process.env.NODE_ENV === "production"
    ? `https://prontotranslationservices.com/api/auth/google/callback`
    : "http://localhost:3000/api/auth/google/callback";

console.log("redirectUri", redirectUri);

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

const GoogleOauthCallback = (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise<void>((resolve, reject) => {
    console.log("attempting to authenticate");
    const { code } = req.query;
    console.log("code", code);
    if (!code) {
      res.status(400).send("Invalid request: No code provided");
      return;
    }

    console.log("token exists");
    console.log("redirectUri", redirectUri);
    // Exchange the authorization code for an access token
    oauth2Client
      .getToken(code as string)
      .then(({ tokens }) => {
        console.log("token exists");
        console.log("tokens", tokens);

        oauth2Client.setCredentials(tokens);

        console.log("set credentials");

        const oauth2 = google.oauth2({
          auth: oauth2Client,
          version: "v2",
        });

        console.log("established oauth2 client");

        const idToken = tokens.id_token;

        if (!idToken) {
          return res.status(400).send("Invalid request: No idToken provided");
        }

        // Retrieve user information
        console.log("getting user data");
        const userInfo = oauth2.userinfo.get().then((userInfo) => {
          console.log("got user data");
          const expiresIn = tokens.expiry_date;
          const userData = userInfo.data;
          if (userData) {
            console.log("userData: ", userData);
            console.log("attempting to authenticate");

            axios
              .post(`${process.env.NEXT_PUBLIC_API_URL}/login`, userData, {
                headers: {
                  authorization: idToken,
                },
              })
              .then((dataRes) => {
                const resCookies = dataRes.headers["set-cookie"];
                if (resCookies) {
                  const tokens = parseSetCookie(resCookies);
                  console.log("SETTING COOKIES");

                  console.log("cookie", dataRes.headers["set-cookie"]);

                  res.setHeader(
                    "set-cookie",
                    `x-access-token=${
                      tokens["x-access-token"]
                    }; path=/; secure; httponly; samesite=none; expires=${expiresIn}; domain=${
                      process.env.NODE_ENV === "production"
                        ? "localhost"
                        : ".prontotranslationservices.com"
                    };`
                  );
                  res.redirect(
                    302,
                    process.env.NODE_ENV === "production"
                      ? "https://prontotranslationservices.com/"
                      : "http://localhost:3000/"
                  );
                }
              });
          }
        });
      })
      .catch((err) => {
        console.log("oauth2Client.getToken error", err.message);
        res.status(500).send("Error retrieving access token");
        reject(err.message);
      });
  });
};

// const resCookies = dataRes.headers["set-cookie"];
//                 if (resCookies) {
//                   tokens = parseSetCookie(resCookies);
//                   console.log("SETTING COOKIES");
//                   setCookie("x-access-token", tokens["x-access-token"], {
//                     req,
//                     res,
//                     sameSite: false,
//                     secure: true,
//                   });

export default GoogleOauthCallback;

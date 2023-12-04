import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { setCookie, deleteCookie } from "cookies-next";
import { login } from "../../../redux/graphql/mutations/login";
import { print } from "graphql/language/printer";
import axios from "axios";
import { parseSetCookie } from "../../../utils/parseSetCookie";
import { access } from "fs";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET_ID!,
        idToken: true,
        authorization: {
          params: {
            prompt: "consent",
            access_type: "offline",
            scope:
              "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/user.phonenumbers.read",
            response_type: "code",
          },
        },
      }),
    ],
    session: {
      strategy: "jwt",
    },
    pages: {
      signIn: "/login",
      signOut: "/login",
    },
    callbacks: {
      async redirect({ baseUrl, url }) {
        return url;
      },
      async signIn({ user, account, profile, email, credentials }) {
        // From here I can send an api call to my api's login endpoint where I would check if the user exists in the system
        // On the api I can either create a user then generate a token there or generate a token if a user already exists.
        // In the response of my api I would return a cookie with the token stored in it that would persist on the frontend.

        console.log(
          "SIGN IN CALLBACK",
          user,
          account,
          profile,
          email,
          credentials
        );

        if (account) {
          if (user && profile) {
            const name = user.name!.split(" ");
            const firstName = name[0];
            const lastName = name[1];

            let tokens;

            const existingUser = await axios
              .post(
                process.env.NEXT_PUBLIC_API_URL! + "/login",
                {
                  email: user.email,
                  firstName,
                  lastName,
                },
                {
                  headers: {
                    Authorization: `Bearer ${account.id_token}`,
                  },
                }
              )
              .then((dataRes) => {
                console.log("SUCCESSFULLY LOGGED IN");
                const resCookies = dataRes.headers["set-cookie"];

                if (resCookies) {
                  tokens = parseSetCookie(resCookies);
                  console.log("SETTING COOKIES");

                  setCookie("x-access-token", tokens["x-access-token"], {
                    req,
                    res,
                    sameSite: false,
                    secure: true,
                  });

                  // setCookie(
                  //   "x-refresh-token",
                  //   encodeURIComponent(tokens["x-refresh-token"]),
                  //   {
                  //     req,
                  //     res,
                  //     sameSite: false,
                  //     secure: true,
                  //   }
                  // );
                }

                return dataRes.data;
              })
              .catch((err) => {
                console.log("Error", err.message);
                return err;
              });

            if (
              !tokens ||
              (tokens && !Object.keys(tokens).includes("x-access-token"))
            )
              return false;

            user = { ...user, ...existingUser };

            return true;
          }
        }

        return "/";
      },

      async session({ session, user, token }) {
        if (token) {
          if (session && session.user && token.sub) session.user.id = token.sub;
        }

        return session;
      },
      async jwt({ token, user, account, profile, isNewUser }) {
        return token;
      },
    },
    events: {
      signOut: async ({ token }) => {
        console.log("SIGN OUT EVENT", token);

        if (token) {
          const base64EncodedToken = Buffer.from(
            JSON.stringify(token)
          ).toString("base64");
          console.log(base64EncodedToken);
          await axios
            .post(
              process.env.NEXT_PUBLIC_API_URL! + "/signout",
              {},
              {
                headers: {
                  "Content-Type": "application/json",
                  authorization: base64EncodedToken,
                },
              }
            )
            .then((dataRes) => {
              console.log("SIGN OUT RESPONSE", dataRes.data);
              const resCookies = dataRes.headers["set-cookie"];

              if (resCookies) {
                const tokens = parseSetCookie(resCookies);
                setCookie("x-access-token", tokens["x-access-token"], {
                  req,
                  res,
                  sameSite: false,
                  secure: true,
                });
                deleteCookie("x-refresh-token", { req, res });
              }
            })
            .catch((err) => {
              console.log("SIGN OUT ERROR", err.message);
            });
        }

        return Promise.resolve();
      },
    },
  });
}

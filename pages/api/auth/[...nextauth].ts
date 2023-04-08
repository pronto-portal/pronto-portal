import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { setCookie } from "cookies-next";
import { login } from "../../../graphql/mutations/login";
import { print } from "graphql/language/printer";
import axios from "axios";
import { parseSetCookie } from "../../../utils/parseSetCookie";

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
    },
    callbacks: {
      async redirect({ baseUrl }) {
        return baseUrl;
      },
      async signIn({ user, account, profile, email, credentials }) {
        // From here I can send an api call to my api's login endpoint where I would check if the user exists in the system
        // On the api I can either create a user then generate a token there or generate a token if a user already exists.
        // In the response of my api I would return a cookie with the token stored in it that would persist on the frontend.
        if (account) {
          if (user && profile) {
            const name = user.name!.split(" ");
            const firstName = name[0];
            const lastName = name[1];

            const requestBody = {
              query: print(login),
              variables: {
                email: user.email,
                firstName,
                lastName,
              },
            };

            const tokens = await axios
              .post("http://localhost:4000/graphql", requestBody, {
                headers: {
                  Authorization: `Bearer ${account.id_token}`,
                },
              })
              .then((dataRes) => {
                const resCookies = dataRes.headers["set-cookie"];

                if (resCookies) {
                  const cookies = parseSetCookie(resCookies);

                  setCookie("x-access-token", cookies["x-access-token"], {
                    req,
                    res,
                  });

                  setCookie("x-refresh-token", cookies["x-refresh-token"], {
                    req,
                    res,
                  });

                  return cookies;
                }
              });

            if (
              !tokens ||
              (tokens && !Object.keys(tokens).includes("x-access-token"))
            )
              return false;
          }
        }

        return true;
      },

      async session({ session, user, token }) {
        if (token && token.id_token) {
          session.id_token = token.id_token;
        }

        return session;
      },
      async jwt({ token, user, account, profile, isNewUser }) {
        if (account) {
          token.id_token = account.id_token;
        }

        return token;
      },
    },
  });
}

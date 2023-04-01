import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

import { JWT } from "next-auth/jwt";
import { UserType } from "@/types";

type UserCredentials = {
  username: string;
  password: string;
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  theme: {
    colorScheme: "light",
    logo: "/images/logo.svg",
  },
  debug: true,
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password", placeholder: "password" }
      },
      async authorize(credentials, req) {
        const { username, password } = credentials as UserCredentials;
        const res = await fetch("http://localhost:8000/auth/token", {
          method: 'POST',
          body: `username=${username}&password=${password}`,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        });

        const res2 = await res.json();
        const access_token = res2.access_token;

        if (!access_token) {
          return null;
        }

        const user = await fetch("http://localhost:8000/users/me", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access_token}`
          }
        }).then(response => response.json());
        // If no error and we have user data, return it

        if (user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    //@ts-ignore
    jwt: ({token, user}: {token: JWT, user: UserType}) => {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }

      return token;
    },
    session: ({session, token}) => {
      if (token) {
        //@ts-ignore
        session.id = token.id;
        //@ts-ignore
        session.username = token.username;
      }
      return session;
    },
    redirect: ({ url, baseUrl }) => {
      if (url == '/') {
        return '/home';
      }
      return url;
    }
  },
};

export default NextAuth(authOptions);

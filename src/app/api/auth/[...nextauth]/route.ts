import { AuthJWT, AuthSession, AuthUser } from "@/app/types/Auth.types";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextRequest } from "next/server";

const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    // ...add more providers here
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    signIn: async ({ user, account, profile }) => {
      console.log({ user, account, profile });
      if (
        account?.provider === "google" &&
        account.access_token &&
        profile?.sub
      ) {
        try {
          const response = await fetch(`${process.env.API_URL}/auth/sign-in`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              provider_id: profile.sub,
              auth_provider: 0,
              provider_token: account.id_token,
            }),
          });
          if (!response.ok) return false;

          const data = await response.json();

          // Attach API tokens and user info to the user object for jwt callback
          (user as AuthUser).apiUser = {
            email: data.email,
            first_name: data.first_name,
            access_token: data.access_token,
            refresh_token: data.refresh_token,
            expires_in: data.expires_in,
          };
        } catch {
          return false;
        }
      }
      return true;
    },
    jwt: async ({ token, user }) => {
      if ((user as AuthUser)?.apiUser) {
        (token as AuthUser).apiUser = (user as AuthUser).apiUser;
      }
      return token as AuthJWT;
    },

    session: async ({
      session,
      token,
    }: {
      session: AuthSession;
      token: AuthJWT;
    }) => {
      if ((token as AuthUser).apiUser) {
        (session as AuthUser).apiUser = (token as AuthUser).apiUser;
      }
      return session;
    },
  },
};

const handler = async function auth(req: NextRequest, res: unknown) {
  return await NextAuth(
    req as unknown as NextApiRequest,
    res as unknown as NextApiResponse,
    authOptions
  );
};

export { handler as GET, handler as POST };

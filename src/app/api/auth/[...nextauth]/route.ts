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
            user_id: data.user.id,
            email: data.user.email,
            first_name: data.user.first_name,
          };

          const tokenExpiresAt =
            Date.now() + ((data.expires_in as number) - 2 * 60) * 1000; // 2 minutes buffer

          (user as AuthUser).apiTokenInfo = {
            apiAccessToken: data.access_token,
            apiRefreshToken: data.refresh_token,
            apiAccessTokenExpiresAt: tokenExpiresAt,
          };
        } catch {
          return false;
        }
      }
      return true;
    },
    jwt: async ({ token, user }) => {
      if ((user as AuthUser)?.apiUser) {
        (token as AuthJWT).apiUser = (user as AuthUser).apiUser;
        (token as AuthJWT).apiAccessTokenInfo = (user as AuthUser).apiTokenInfo;
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
      const tokenUser = (token as AuthJWT).apiUser;
      const tokenApiAccessTokenInfo = (token as AuthJWT).apiAccessTokenInfo;
      if (tokenUser) {
        (session as AuthSession).apiUser = tokenUser;
        (session as AuthSession).apiTokenInfo = tokenApiAccessTokenInfo;
      }

      return session;
    },

    redirect: async ({ url, baseUrl }) => {
      // Allow only relative URLs or URLs starting with baseUrl for security
      if (url.startsWith(baseUrl)) return url;
      if (url.startsWith("/")) return baseUrl + url;
      return baseUrl;
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

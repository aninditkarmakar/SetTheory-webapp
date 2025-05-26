import { AuthJWT, AuthSession } from "@/app/types/Auth.types";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { NextRequest } from "next/server";

const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    // ...add more providers here
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, account }) => {
      if (account) {
        // If this is the first time the user is signing in, add the access token to the JWT
        token.accessToken = account.access_token;
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
      session.accessToken = token.accessToken;

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

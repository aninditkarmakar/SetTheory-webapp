import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

export interface AuthSession extends Session {
  accessToken?: string;
}

export interface AuthJWT extends JWT {
  accessToken?: string;
  apiUser?: ApiUser;
}

interface ApiUser {
  email: string;
  first_name: string;
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface AuthUser {
  apiUser?: ApiUser;
}

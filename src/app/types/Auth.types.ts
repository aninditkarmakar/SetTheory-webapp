import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

export interface ApiUser {
  user_id: string;
  email: string;
  first_name: string;
}

export interface ApiTokenInfo {
  apiAccessToken?: string;
  apiRefreshToken?: string;
  apiAccessTokenExpiresAt?: number;
}

export interface AuthSession extends Session {
  apiUser?: ApiUser;
  apiTokenInfo?: ApiTokenInfo;
}

export interface AuthJWT extends JWT {
  apiUser?: ApiUser;
  apiAccessTokenInfo?: ApiTokenInfo;
}

export interface AuthUser {
  apiUser?: ApiUser;
  apiTokenInfo?: ApiTokenInfo;
}

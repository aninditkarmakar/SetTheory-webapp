import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

export interface AuthSession extends Session {
  accessToken?: string;
}

export interface AuthJWT extends JWT {
  accessToken?: string;
}

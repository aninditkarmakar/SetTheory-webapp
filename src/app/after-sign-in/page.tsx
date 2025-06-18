"use client";

import { signOut, useSession } from "next-auth/react";
import { AuthSession } from "../types/Auth.types";

export default function Page() {
  const { data: session }: { data: AuthSession | null } = useSession();

  return (
    <>
      <h1>{session?.apiUser?.first_name} is Logged In!</h1>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        Sign Out
      </button>
    </>
  );
}

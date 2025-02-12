"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="rounded bg-red-500 p-2 text-white"
    >
      Logout
    </button>
  );
}

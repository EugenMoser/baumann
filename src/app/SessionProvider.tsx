//workaround for next-auth/react not being able to use in the server component layout.tsx (ecommerce )

"use client";

import { Session } from "next-auth";
// export { SessionProvider as default } from "next-auth/react";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

interface SessionProviderProps {
  // session: Session | null;
  children: React.ReactNode;
}

export default function SessionProvider({
  // session,
  children,
}: SessionProviderProps): React.JSX.Element {
  return (
    // <NextAuthSessionProvider session={session}>
    <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
  );
}

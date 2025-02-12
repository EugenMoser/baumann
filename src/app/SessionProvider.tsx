//workaround for next-auth/react not being able to use in the server component layout.tsx (ecommerce )

"use client";

export { SessionProvider as default } from "next-auth/react";

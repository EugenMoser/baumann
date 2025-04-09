import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { Admin } from "@prisma/client";

import { getAdminByEmail } from "./lib/database";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        let admin: Admin | null = null;
        try {
          admin = await getAdminByEmail(credentials?.email as string);
        } catch (error: any) {
          console.error("Authentication error:", error);
          return null;
        }
        // Check if admin exists
        if (!admin) {
          console.error("Admin not found");
          return null;
        }

        // Verify password
        const isValid = await bcrypt.compare(
          credentials.password as string,
          admin.password,
        );
        if (!isValid) {
          console.error("Invalid password");
          return null;
        }

        return {
          id: admin.id,
          email: admin.email,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 12 * 60 * 60, // session duration in seconds (12 hours)
  },
  jwt: {
    maxAge: 12 * 60 * 60, // JWT duration in seconds, same as session
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 12 * 60 * 60, // cookie duration in seconds, same as session
      },
    },
  },

  callbacks: {
    async jwt({ token }) {
      return token;
    },
    async session({ session, token }) {
      session.user.email = token.email as string;
      return session;
    },
  },

  pages: {
    signIn: "/login", // Custom login page
  },
});

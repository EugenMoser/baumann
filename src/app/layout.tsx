import "@/styles/globals.css";

import type { Metadata } from "next";

import Navbar from "@/components/Navbar";

import SessionProvider from "./SessionProvider";

export const metadata: Metadata = {
  title: "Baumann Entwicklungen",
  description: "Spritzgussteile von bester Qualität",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="de">
        <body>
          <Navbar />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}

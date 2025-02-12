import "@/styles/globals.css";

import type { Metadata } from "next";

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
        <body>{children}</body>
      </html>
    </SessionProvider>
  );
}

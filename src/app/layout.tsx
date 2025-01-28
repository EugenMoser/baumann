import "@styles/globals.css";

import type { Metadata } from "next";

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
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}

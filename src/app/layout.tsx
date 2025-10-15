import "@/styles/globals.css";

import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";

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
    //suppressHydrationWarning is used to avoid hydration errors when using the ThemeProvider https://github.com/pacocoursey/next-themes
    <html lang="de" suppressHydrationWarning={true}>
      <body className="mx-4 mt-8 sm:mx-8 md:mx-16 lg:mx-32 2xl:mx-64">
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem={true}
            disableTransitionOnChange
          >
            <Navbar />
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

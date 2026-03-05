"use client";

import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { NavigationMenu } from "@/components/ui/navigation-menu";

import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";
import NavbarSearch from "./NavbarSearch";
import ThemeToggle from "./ThemeToggle";

export default function Navbar(): React.JSX.Element | null {
  const pathname = usePathname();
  const { data: session } = useSession();

  // Hide the entire header on login, dashboard, and root ("/") routes
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/dashboard") ||
    pathname === "/"
  )
    return null;

  return (
    <NavigationMenu className={"navFirstDiv mb-8 flex max-w-full"}>
      <NavbarDesktop pathname={pathname} />
      <NavbarSearch />
      <NavbarMobile pathname={pathname} />
      <ThemeToggle />

      {session && (
        <Button
          type="button"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          Logout
        </Button>
      )}
    </NavigationMenu>
  );
}

"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import CustomButton from "@/components/shared/CustomButton";
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
        <CustomButton
          type="button"
          buttonType="logout"
          title="Logout"
          ariaLabel="Logout"
        />
      )}
    </NavigationMenu>
  );
}

"use client";

import clsx from "clsx";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import CustomButton from "@/components/CustomButton";
import { NavigationMenu } from "@/components/ui/navigation-menu";

import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";
import ThemeToggle from "./ThemeToggle";

interface NavbarProps {}
export default function Navbar({}: NavbarProps): React.JSX.Element {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <NavigationMenu
      className={clsx(
        "lg:navFirstDiv mb-8 flex max-w-full justify-between lg:justify-between",
        {
          "justify-end lg:justify-end": pathname === "/",
        },
      )}
    >
      {pathname !== "/" && <NavbarDesktop pathname={pathname} />}
      {pathname !== "/" && <NavbarMobile pathname={pathname} />}
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

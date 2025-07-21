"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import CustomButton from "@/components/CustomButton";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";
import ThemeToggle from "./ThemeToggle";

interface NavbarProps {}
function Navbar({}: NavbarProps): React.JSX.Element {
  const pathname = usePathname();
  const { data: session } = useSession();
  return (
    <NavigationMenu className="nav-div m-4 flex max-w-full justify-between lg:justify-around">
      <NavbarDesktop pathname={pathname} />
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

export default Navbar;

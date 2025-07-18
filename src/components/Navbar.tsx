"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import CustomButton from "./CustomButton";
import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";
import ThemeToggle from "./ThemeToggle";

interface NavbarProps {}
function Navbar({}: NavbarProps): React.JSX.Element {
  const pathname = usePathname();
  const { data: session } = useSession();
  return (
    <NavigationMenu className="nav-div m-4 flex max-w-full justify-end lg:justify-around">
      {/* Desktop Navigation */}
      <NavbarDesktop pathname={pathname} />
      <NavbarMobile pathname={pathname} />
      <ThemeToggle />

      {session && <CustomButton type="button" buttonType="logout" />}
    </NavigationMenu>
  );
}

export default Navbar;

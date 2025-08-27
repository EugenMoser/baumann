"use client";
import { useState } from "react";

import clsx from "clsx";
import { Menu, X } from "lucide-react";
import Link from "next/link";

import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import productCategories from "@/constants/productCategories";

import ThemeToggle from "./ThemeToggle";
import { Button } from "./ui/button";

interface NavbarMobileProps {
  pathname: string;
}

export default function NavbarMobile({
  pathname,
}: NavbarMobileProps): React.JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      {!open && (
        <Button
          variant="outline"
          className="text-navbar-itemForegroun h-[36px] w-[36px] bg-navbar-itemBackground p-0 hover:bg-navbar-hover hover:text-navbar lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
        >
          <Menu className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      )}

      {open && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-10 bg-black/70"
            onClick={() => setOpen(false)}
          />
          {/* Menu */}
          <div className="fixed inset-0 left-[70%] z-20 flex flex-col justify-start bg-white dark:bg-black lg:hidden">
            <Button
              variant="outline"
              className="text-navbar-itemForegroun absolute right-10 top-5 z-50 h-[36px] w-[36px] bg-navbar-itemBackground p-0 hover:bg-navbar-hover hover:text-navbar lg:hidden"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Menü schließen" : "Menü öffnen"}
            >
              {/* Icons mit eigener Animation */}
              <X className="d h-[1.2rem] w-[1.2rem]" />
            </Button>
            <NavigationMenuList className="mx-10 mt-[40%] flex flex-col gap-5 text-xl">
              {productCategories.map((category) => (
                <NavigationMenuItem
                  key={category.category}
                  className={clsx(
                    "flex h-[36px] w-full grow cursor-pointer items-center justify-center rounded-md p-2",

                    {
                      "bg-navbar-active text-navbar underline":
                        pathname === category.href, // Active state
                      "bg-navbar-itemBackground hover:bg-navbar-hover hover:text-navbar":
                        pathname !== category.href, // Hover only when not active
                    },
                  )}
                >
                  <NavigationMenuLink asChild>
                    <Link href={category.href} onClick={() => setOpen(false)}>
                      {category.name}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
            <div className="mx-10 mt-5">
              <ThemeToggle mobile />
              //todo add contact
            </div>
          </div>
        </>
      )}
    </>
  );
}

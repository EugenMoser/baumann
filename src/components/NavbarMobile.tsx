"use client";
import { useState } from "react";

import clsx from "clsx";
import {
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { log } from "util";

import CustomButton from "@/components/CustomButton";
import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import productCategories from "@/constants/productCategories";

import { Button } from "./ui/button";

interface ComponentNameProps {
  pathname: string;
}

export default function ComponentName({
  pathname,
}: ComponentNameProps): React.JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  console.log("----->>>>> openo", open);
  return (
    <>
      {/* Hamburger + Close Button */}
      <Button
        variant="outline"
        className={clsx(
          "z-50 h-[36px] w-[36px] p-0 hover:bg-navbar-hover hover:text-navbar lg:hidden",
          // Entferne die rotation/scale Animation vom Button selbst
        )}
        onClick={() => setOpen(!open)}
        aria-label={open ? "Menü schließen" : "Menü öffnen"}
      >
        {/* Icons mit eigener Animation */}
        <X
          className={clsx(
            "absolute h-[1.2rem] w-[1.2rem] transition-all duration-300",
            {
              "rotate-0 scale-100": open,
              "rotate-90 scale-0": !open,
            },
          )}
        />
        <Menu
          className={clsx(
            "absolute h-[1.2rem] w-[1.2rem] transition-all duration-300",
            {
              "rotate-90 scale-0": open,
              "rotate-0 scale-100": !open,
            },
          )}
        />
      </Button>

      {open && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-10 bg-black/70 lg:hidden"
            onClick={() => setOpen(false)}
          />
          {/* Menu */}
          <div className="fixed inset-0 z-20 flex w-max flex-col justify-start bg-white dark:bg-black lg:hidden">
            <NavigationMenuList className="ml-2 mr-2 mt-[40%] flex flex-col gap-5 text-xl">
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
          </div>
        </>
      )}
    </>
  );
}

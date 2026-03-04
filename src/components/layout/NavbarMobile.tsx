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

import { Button } from "../ui/button";
import ThemeToggle from "./ThemeToggle";

interface NavbarMobileProps {
  pathname: string;
}

export default function NavbarMobile({
  pathname,
}: NavbarMobileProps): React.JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <Button
        variant="outline"
        className={clsx("btn h-[36px] w-[36px] p-3 xl:hidden", {
          "fixed right-5 top-5 z-50": open,
        })}
        onClick={() => setOpen(!open)}
        aria-label={open ? "Menü schließen" : "Menü öffnen"}
      >
        <Menu className={clsx("", { hidden: open })} />
        <X className={clsx("z-40", { hidden: !open })} />
      </Button>

      {open && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-10 bg-overlay"
            onClick={() => setOpen(false)}
          />
          {/* Menu */}
          <div className="fixed inset-0 left-[50%] z-20 flex flex-col justify-start bg-background md:left-[70%] xl:hidden">
            <NavigationMenuList className="mt-[40%] flex min-w-full flex-col gap-5 text-xl">
              {productCategories.map((category) => (
                <NavigationMenuItem
                  key={category.category}
                  className={clsx(
                    "navbar-item flex h-[36px] min-w-full items-center justify-center",
                    {
                      underline: pathname === category.href, // Active state
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
              {/* TODO: Add contact */}
            </div>
          </div>
        </>
      )}
    </>
  );
}

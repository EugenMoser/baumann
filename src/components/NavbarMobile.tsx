"use client";
import { useState } from "react";

import clsx from "clsx";
import Link from "next/link";

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

  return (
    <>
      <Button
        variant="outline"
        className="mr-4 px-3 py-3 lg:hidden"
        onClick={() => setOpen(!open)}
        aria-label="Menü öffnen"
      >
        <svg className="h-6 w-6 fill-current" viewBox="0 0 20 20">
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Button>

      {open && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40 bg-black/70 lg:hidden"
            onClick={() => setOpen(false)}
          />
          {/* Menu */}
          <div className="fixed inset-0 left-[30vw] z-50 flex flex-col items-center justify-center bg-white p-4 dark:bg-black lg:hidden">
            <button
              className="absolute right-4 top-4 text-3xl"
              onClick={() => setOpen(false)}
              aria-label="Menü schließen"
            >
              &times;
            </button>
            <NavigationMenuList className="flex flex-col gap-8 text-2xl">
              {productCategories.map((category) => (
                <NavigationMenuItem key={category.category}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={category.href}
                      onClick={() => setOpen(false)}
                      className={clsx(
                        "block rounded bg-navbar-itemBackground px-4 py-2 hover:bg-navbar-hover",
                        {
                          "bg-sky-100 text-blue-600":
                            pathname === category.href,
                        },
                      )}
                    >
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

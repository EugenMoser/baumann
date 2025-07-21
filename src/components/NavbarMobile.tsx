"use client";
import { useState } from "react";

import clsx from "clsx";
import { CircleX } from "lucide-react";
import Link from "next/link";

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
          <div className="fixed inset-0 left-auto z-50 flex flex-col justify-start bg-white dark:bg-black lg:hidden">
            <CustomButton
              type="button"
              buttonType="onClickFunction"
              onClickFunction={() => setOpen(false)}
              children={<CircleX />}
              className="absolute right-4 top-4 text-3xl"
              ariaLabel="Menü schließen"
            />
            ;
            <NavigationMenuList className="mt-[30%] flex flex-col gap-5 text-xl">
              {productCategories.map((category) => (
                <NavigationMenuItem
                  key={category.category}
                  className={clsx("block w-full rounded px-4 py-2", {
                    "bg-sky-100 text-blue-600": pathname === category.href,
                    "bg-navbar-itemBackground hover:bg-navbar-hover hover:text-navbar dark:hover:bg-navbar-hover":
                      pathname !== category.href,
                  })}
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

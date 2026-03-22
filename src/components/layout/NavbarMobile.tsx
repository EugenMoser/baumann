"use client";

import clsx from "clsx";
import { Menu } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import productCategories from "@/constants/productCategories";

import ThemeToggle from "./ThemeToggle";

interface NavbarMobileProps {
  pathname: string;
}

export default function NavbarMobile({
  pathname,
}: NavbarMobileProps): React.JSX.Element {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="btn h-[36px] w-[36px] p-3 xl:hidden"
          aria-label="Menü öffnen"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col pt-16">
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <nav className="flex flex-col gap-5 text-xl">
          {productCategories.map((category) => (
            <Link
              key={category.category}
              href={category.href}
              className={clsx(
                "navbar-item flex h-[36px] items-center justify-center",
                { underline: pathname === category.href },
              )}
            >
              {category.name}
            </Link>
          ))}
        </nav>
        <div className="mt-5">
          <ThemeToggle mobile />
        </div>
      </SheetContent>
    </Sheet>
  );
}

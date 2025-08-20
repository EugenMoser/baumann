import clsx from "clsx";
import Link from "next/link";

import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import productCategories from "@/constants/productCategories";

interface NavbarDesktopProps {
  pathname: string;
}

export default function NavbarDesktop({
  pathname,
}: NavbarDesktopProps): React.JSX.Element {
  return (
    <>
      <NavigationMenuList className="hidden w-full max-w-full list-none justify-between lg:flex">
        {productCategories.map((category) => (
          <NavigationMenuItem
            key={category.category}
            tabIndex={0}
            className={clsx(
              "flex h-[36px] min-w-32 items-center justify-center rounded-md shadow-sm transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary",
              {
                "bg-navbar-active text-navbar underline":
                  pathname === category.href, // Active state
                "bg-navbar-itemBackground hover:bg-navbar-hover hover:text-navbar":
                  pathname !== category.href, // Hover only when not active
              },
            )}
          >
            <NavigationMenuLink asChild>
              <Link
                key={category.category}
                href={category.href}
                tabIndex={-1}
                className="focus:outline-none"
              >
                {category.name}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </>
  );
}

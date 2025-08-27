import clsx from "clsx";
import Link from "next/link";

import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import productCategories, {
  CategoryProps,
} from "@/constants/productCategories";

interface NavbarDesktopProps {
  pathname: string;
}

export default function NavbarDesktop({
  pathname,
}: NavbarDesktopProps): React.JSX.Element {
  return (
    <>
      {productCategories.map((category: CategoryProps) => (
        <NavigationMenuLink asChild key={category.category}>
          <Link
            href={category.href}
            tabIndex={-1}
            className="focus:outline-none"
          >
            <NavigationMenuList className="hidden w-full max-w-full list-none justify-between lg:flex">
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
                {category.name}
              </NavigationMenuItem>
            </NavigationMenuList>
          </Link>
        </NavigationMenuLink>
      ))}
    </>
  );
}

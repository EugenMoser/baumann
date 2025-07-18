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
    <NavigationMenuList className="hidden w-full max-w-full list-none justify-around gap-4 lg:flex">
      {productCategories.map((category) => (
        <NavigationMenuItem
          key={category.category}
          className={clsx(
            "flex h-[36px] w-24 min-w-fit grow cursor-pointer items-center justify-center rounded-md p-2",

            {
              "bg-navbar-active text-navbar underline":
                pathname === category.href, // Active state
              "bg-navbar-itemBackground hover:bg-navbar-hover hover:text-navbar dark:hover:bg-navbar-hover":
                pathname !== category.href, // Hover only when not active
            },
          )}
        >
          <NavigationMenuLink asChild>
            <Link key={category.category} href={category.href}>
              {category.name}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      ))}
    </NavigationMenuList>
  );
}

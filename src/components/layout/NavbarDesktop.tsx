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

import NavbarSearch from "./NavbarSearch";

interface NavbarDesktopProps {
  pathname: string;
}

export default function NavbarDesktop({
  pathname,
}: NavbarDesktopProps): React.JSX.Element {
  return (
    <div className="gap-4">
      {productCategories.map((category: CategoryProps) => (
        <NavigationMenuLink
          asChild
          key={category.category}
          className="hidden xl:flex"
        >
          <Link
            href={category.href}
            tabIndex={-1}
            className="focus:outline-none"
          >
            <NavigationMenuList className="w-full max-w-full list-none justify-between">
              <NavigationMenuItem
                key={category.category}
                tabIndex={0}
                className={clsx(
                  "navbar-item flex h-[36px] min-w-32 items-center justify-center",
                  {
                    underline: pathname === category.href, // Active state
                  },
                )}
              >
                {category.name}
              </NavigationMenuItem>
            </NavigationMenuList>
          </Link>
        </NavigationMenuLink>
      ))}
    </div>
  );
}

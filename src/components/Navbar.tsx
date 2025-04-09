"use client";

import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import productCategories from "@/constants/productCategories";

import CustomButton from "./CustomButton";

interface NavbarProps {}
function Navbar({}: NavbarProps): React.JSX.Element {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <nav className="m- flex flex-row justify-between gap-3">
      {productCategories.map((category) => (
        <Link
          key={category.category}
          href={category.href}
          className={clsx(
            "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
            {
              "bg-sky-100 text-blue-600": pathname === category.href,
            },
          )}
        >
          {category.name}
        </Link>
      ))}
      {session && <CustomButton type="button" buttonType="logout" />}
    </nav>
  );
}

export default Navbar;

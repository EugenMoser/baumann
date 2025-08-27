"use client";
import * as React from "react";

import clsx from "clsx";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import CustomButton from "@/components/CustomButton";

interface ThemeToggleProps {
  mobile?: boolean;
}
export default function ThemeToggle({ mobile }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Mounting is necessary to avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  function handleOnClick() {
    if (theme === "dark") {
      setTheme("light");
      localStorage.setItem("theme", "light");
    } else {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    }
  }

  return (
    <CustomButton
      type="button"
      buttonType="themeToggle"
      onClickFunction={handleOnClick}
      className={clsx(
        "hidden rounded-md bg-navbar-itemBackground p-3 hover:bg-navbar-itemForeground hover:text-navbar lg:flex",

        {
          "flex w-[50%] lg:hidden": mobile,
        },
      )}
      ariaLabel="Theme wechseln"
    >
      <Sun className="duration-400 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="duration-400 absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </CustomButton>
  );
}

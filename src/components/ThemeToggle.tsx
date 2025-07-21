"use client";
import * as React from "react";

import {
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";

import CustomButton from "@/components/CustomButton";

export default function ThemeToggle() {
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
      className="rounded-md bg-navbar-itemBackground px-3 py-3 hover:bg-navbar-active hover:text-navbar dark:hover:bg-navbar-hover"
      ariaLabel="Theme wechseln"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </CustomButton>
  );
}

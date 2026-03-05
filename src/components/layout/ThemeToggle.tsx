"use client";
import * as React from "react";

import clsx from "clsx";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

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
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={handleOnClick}
      aria-label="Theme wechseln"
      className={clsx("btn group hidden p-3 xl:flex", {
        "flex h-[36px] w-[36px] xl:hidden": mobile,
      })}
    >
      <Sun className="duration-600 rotate-0 scale-100 transform transition-transform group-active:rotate-12 dark:-rotate-90 dark:scale-0" />
      <Moon className="duration-600 absolute h-[36px] w-[36px] rotate-90 scale-0 transform transition-transform group-active:-rotate-12 dark:rotate-0 dark:scale-100" />
    </Button>
  );
}

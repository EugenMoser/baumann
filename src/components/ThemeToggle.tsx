"use client";

import * as React from "react";

import { useTheme } from "next-themes";

import CustomButton from "@/components/CustomButton";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

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
      handleOnClick={handleOnClick}
    />
  );
}

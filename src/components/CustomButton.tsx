"use client";

import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { title } from "process";

import { Button } from "./ui/button";

interface CustomButtonProps {
  type: "button" | "submit";
  buttonType:
    | "redirect"
    | "onClickFunction"
    | "defaultButton"
    | "logout"
    | "themeToggle";

  title: string;
  children?: React.ReactNode;
  redirectUrl?: string;
  isDisabled?: boolean;
  onClickFunction?: () => void;
  className?: string;
}

export default function CustomButton({
  type,
  buttonType,
  title,
  children,
  redirectUrl,
  isDisabled = false,
  onClickFunction,
  className,
}: CustomButtonProps): React.JSX.Element {
  switch (buttonType) {
    case "redirect":
      return (
        <Button
          type={type}
          onClick={() => redirect(redirectUrl!)}
          className={className}
        >
          {title}
        </Button>
      );

    case "onClickFunction":
      return (
        <Button
          type={type}
          onClick={onClickFunction && (() => onClickFunction())}
          disabled={isDisabled}
        >
          {children || title}
        </Button>
      );

    case "logout":
      return (
        <Button type={type} onClick={() => signOut({ callbackUrl: "/login" })}>
          {title}
        </Button>
      );

    case "defaultButton":
      return (
        <Button type={type} disabled={isDisabled}>
          {title}
        </Button>
      );

    case "themeToggle":
      return (
        <Button variant="outline" size="icon" onClick={onClickFunction}>
          {children}
        </Button>
      );

    default:
      return (
        <Button type={type} onClick={() => redirect("/")}>
          Zurück
        </Button>
      );
  }
}

"use client";

import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { title } from "process";

import { Button } from "./ui/button";

interface _CustomButtonProps {
  type: "button" | "submit";
  buttonType:
    | "redirect"
    | "onClickFunction"
    | "defaultButton"
    | "logout"
    | "themeToggle";
  redirectUrl?: string;
  isDisabled?: boolean;
  onClickFunction?: () => void;
  className?: string;
  ariaLabel: string;
  // Require at least one of 'title' or 'children'
  title?: string;
  children?: React.ReactNode;
}

// Enforce at least one of 'title' or 'children'
type RequireTitleOrChildren<T> =
  | (T & { title: string; children?: never })
  | (T & { title?: never; children: React.ReactNode });

type CustomButtonProps = RequireTitleOrChildren<_CustomButtonProps>;

export default function CustomButton({
  type,
  buttonType,
  title,
  children,
  redirectUrl,
  isDisabled = false,
  onClickFunction,
  className,
  ariaLabel,
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
          className={className}
          disabled={isDisabled}
          aria-label={ariaLabel}
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
        <Button type={type} disabled={isDisabled} className={className}>
          {title}
        </Button>
      );

    case "themeToggle":
      return (
        <Button
          variant="outline"
          size="icon"
          className={className}
          onClick={onClickFunction}
        >
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

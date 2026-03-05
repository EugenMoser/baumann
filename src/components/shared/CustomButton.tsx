"use client";

import { Loader2 } from "lucide-react";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

import { Button } from "../ui/button";

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
  /** When true disables the button and shows a loading spinner. */
  isPending?: boolean;
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
  isPending = false,
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
          title={title}
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
        <Button
          type={type}
          disabled={isDisabled || isPending}
          className={className}
          aria-label={ariaLabel}
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
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

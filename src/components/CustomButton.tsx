"use client";
import { Moon, Sun } from "lucide-react";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

import { Button } from "./ui/button";

interface CustomButtonProps {
  buttonType:
    | "goHome"
    | "goBack"
    | "goLogin"
    | "goDashboard"
    | "goResetPassword"
    | "login"
    | "logout"
    | "request-link"
    | "change-password"
    | "reset"
    | "addProduct"
    | "themeToggle";
  type: "button" | "submit";
  category?: string;
  isDisabled?: boolean;
  handleOnClick?: () => void;
  reset?: () => void;
}

export default function CustomButton({
  buttonType,
  type,
  category,
  isDisabled,
  handleOnClick,
  reset,
}: CustomButtonProps): React.JSX.Element {
  switch (buttonType) {
    case "goBack":
      if (category === undefined) {
        console.error("Back button requires a category");
        // if category is undefined, display the default button
        return (
          <Button type={type} onClick={() => redirect("/")}>
            Zur Startseite
          </Button>
        );
      }
      return (
        <Button type={type} onClick={() => redirect(`/products/${category}`)}>
          Zurück
        </Button>
      );

    case "reset":
      return (
        <Button type={type} onClick={reset && (() => reset())}>
          Seite neue laden
        </Button>
      );

    case "goLogin":
      return (
        <Button type={type} onClick={() => redirect("/login")}>
          Zum Login
        </Button>
      );

    case "goDashboard":
      return (
        <Button type={type} onClick={() => redirect("/dashboard")}>
          Weiter zum Dashboard
        </Button>
      );

    case "logout":
      return (
        <Button
          type={type}
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="rounded bg-red-500 p-2 text-white"
        >
          Logout
        </Button>
      );
    case "login":
      return (
        <Button
          type={type}
          className="rounded bg-blue-500 p-2 text-white"
          disabled={isDisabled}
          onClick={() => redirect("/dashboard")}
        >
          Login
        </Button>
      );

    case "request-link":
      return (
        <Button type={type} disabled={isDisabled}>
          Link anfordern
        </Button>
      );

    case "change-password":
      return (
        <Button type={type} disabled={isDisabled}>
          Passwort ändern
        </Button>
      );

    case "goHome":
      return (
        <Button type={type} onClick={() => redirect("/")}>
          Zur Startseite
        </Button>
      );

    case "goResetPassword":
      return (
        <Button type={type} onClick={() => redirect("/password-request")}>
          Password zurücksetzen
        </Button>
      );

    case "addProduct":
      return <Button type={type}>Neues Produkt hinzufügen</Button>;

    case "themeToggle":
      return (
        <Button
          variant="outline"
          size="icon"
          onClick={handleOnClick}
          className="bg-navbar-itemBackground rounded-md px-3 py-3 hover:bg-navbar-active hover:text-navbar dark:hover:bg-navbar-hover"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
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

"use client";
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
    | "reset";
  type: "button" | "submit";
  category?: string;
  isDisabled?: boolean;
  reset?: () => void;
}

export default function CustomButton({
  buttonType,
  type,
  category,
  isDisabled,
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
    default:
      return (
        <Button type={type} onClick={() => redirect("/")}>
          Zurück
        </Button>
      );
  }
}

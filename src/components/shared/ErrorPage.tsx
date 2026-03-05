"use client";

import { useEffect } from "react";

import Link from "next/link";

import { Button } from "@/components/ui/button";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
  type: "password-reset" | "password-request" | "login" | "product";
}

const errorMessages = {
  "password-reset": "beim Reset der E-Mail",
  "password-request": "beim Senden der E-Mail",
  login: "beim Login",
  product: "beim Laden der Produktseite",
};

export function ErrorPage({ error, reset, type }: ErrorPageProps) {
  useEffect(() => {
    console.error(`Error in ${type}: `, error);
  }, [error, type]);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h2 className="text-lg">
        Ups! Irgendetwas ist {errorMessages[type]} schief gelaufen.
        <br />
        Hier ist die Fehlermeldung:
        <br />
        <span className="text-red-500">{error.message}</span>
        <br />
        Grüße Ihr Webserver
      </h2>

      <div className="flex gap-4">
        <Button type="button" onClick={reset}>
          Seite neu laden
        </Button>
        <Button type="button" asChild>
          <Link href="/">Zur Startseite</Link>
        </Button>
      </div>
    </div>
  );
}

"use client";

import { useEffect } from "react";

import { redirect } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>
        Ups! Irgendetwas ist schief gelaufen und ich habe keine Ahnung was.
        Grüße Ihr Webserver
      </h2>
      <button onClick={() => reset()}>Seite neue laden</button>{" "}
      <button onClick={() => redirect("/")}>Zurück zur Startseite</button>
    </div>
  );
}

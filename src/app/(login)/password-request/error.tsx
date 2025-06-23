"use client";

import { useEffect } from "react";

import { redirect } from "next/navigation";

import CustomButton from "@/components/CustomButton";

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
        Ups! Irgendetwas ist beim Senden der E-Mail schief gelaufen. Hier ist
        die Fehlermeldung: <br />
        <span className="text-red-500">{error.message}</span>
        <br /> Grüße Ihr Webserver
      </h2>
      <CustomButton type="button" buttonType="reset" reset={reset} />
      <CustomButton type="button" buttonType="goHome" />
    </div>
  );
}

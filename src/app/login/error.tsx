"use client";

import { useEffect } from "react";

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
    console.error("Error page login: " + error);
  }, [error]);

  return (
    <div>
      <h2>
        Ups! Irgendetwas ist beim Reset der E-Mail schief gelaufen. Hier ist die
        Fehlermeldung: {error.message}. Grüße Ihr Webserver
      </h2>
      <CustomButton type="button" buttonType="reset" reset={reset} />
      <CustomButton type="button" buttonType="goHome" />
    </div>
  );
}

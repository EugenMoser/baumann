"use client";
import { Suspense, useActionState, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { passwordReset } from "@/actions/passwordActions";

import Loading from "./loading";

function PasswordRequestPage() {
  const [message, action, isPending] = useActionState(passwordReset, null);
  const router = useRouter();

  // redirect to dashboard after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        router.push("/dashboard");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message, router]);

  return (
    <Suspense fallback={<Loading />}>
      <h1>Passwort zurücksetzen</h1>
      <form action={action}>
        <input
          type="email"
          name="email"
          placeholder="E-Mail-Adresse"
          required
        />

        <button disabled={isPending}>Link anfordern</button>
      </form>
      {isPending && "Mail wird gesendet..."}
      {message && <p>{message}</p>}
    </Suspense>
  );
}

export default PasswordRequestPage;

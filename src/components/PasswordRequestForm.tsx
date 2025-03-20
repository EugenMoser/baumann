"use client";

import { useActionState, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { passwordRequest, State } from "@/lib/actions";

// todo: implement shadcn ui form
export default function PasswordRequestForm(): React.JSX.Element | null {
  const initialState: State = { message: "", errors: {}, redirect: false };
  const [state, formAction] = useActionState(passwordRequest, initialState);
  const router = useRouter();

  const [hasHydrated, setHasHydrated] = useState(false); // Hydration state

  // solution for hydration error -> https://nextjs.org/docs/messages/react-hydration-error
  useEffect(() => {
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (hasHydrated && state.redirect) {
      // wait for hydration
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    }
  }, [state.redirect, hasHydrated]);

  if (!hasHydrated) {
    return null;
  }

  return (
    <form
      action={formAction}
      noValidate
      className="flex w-1/2 flex-col gap-4 border p-4"
    >
      <Input
        type="email"
        name="email"
        placeholder="E-Mail-Adresse"
        aria-describedby="email-error"
        className="w-50"
      />

      <Button type="submit">Link anfordern</Button>
      <div id="email-error" aria-live="polite" aria-atomic="true">
        {state.errors?.email &&
          state.errors.email.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
      <div id="message" aria-live="polite" aria-atomic="true">
        {state.message && (
          <p className="mt-2 text-sm text-red-500">{state.message}</p>
        )}
      </div>
    </form>
  );
}

"use client";

import { useActionState, useEffect, useState } from "react";

import Link from "next/link";

import { SubmitButton } from "@/components/shared/SubmitButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { passwordRequest } from "@/features/auth/";
import { FormPasswordStates } from "@/features/auth/types";

// todo: implement shadcn ui form
export function PasswordRequestForm(): React.JSX.Element {
  const initialState: FormPasswordStates = {
    message: "",
    errors: {},
    actionSuccess: false,
  };

  const [state, formAction, isPending] = useActionState(
    passwordRequest,
    initialState,
  );

  //disable button if there send a mail to the user
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  useEffect(() => {
    if (!state.errors) {
      setIsDisabled(!isDisabled);
    }
  }, [state.errors]);

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
        disabled={isDisabled}
      />

      {state.errors?.email && (
        <div id="email-error" aria-live="polite" aria-atomic="true">
          {state.errors.email.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
        </div>
      )}

      <SubmitButton isPending={isPending} disabled={isDisabled}>
        Link anfordern
      </SubmitButton>

      {!isPending && state.message && (
        <div id="message" aria-live="polite" aria-atomic="true">
          <p className="mt-2 text-sm text-red-500">{state.message}</p>
        </div>
      )}
      {!isPending && state.actionSuccess && (
        <Button type="button" asChild>
          <Link href="/login">Zum Login</Link>
        </Button>
      )}
    </form>
  );
}

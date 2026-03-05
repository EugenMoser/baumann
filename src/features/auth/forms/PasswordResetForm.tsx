"use client";

import { useActionState, useEffect, useState } from "react";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { SubmitButton } from "@/components/shared/SubmitButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { passwordReset } from "@/features/auth";
import { FormPasswordStates } from "@/features/auth/types";

// todo: implement shadcn ui form
export function PasswordResetForm(): React.JSX.Element | null {
  const initialState: FormPasswordStates = {
    message: "",
    errors: {},
    actionSuccess: false,
  };
  const searchParams = useSearchParams();
  const token: string | null = searchParams.get("token");

  const [state, formAction, isPending] = useActionState(
    passwordReset,
    initialState,
  );

  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  // Function to check if the passwords match
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    setConfirmPassword(value);
  };

  //disable button if there send a mail to the user
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  useEffect(() => {
    if (state.actionSuccess) {
      setIsDisabled(!isDisabled);
    }
  }, [state.actionSuccess]);
  // solution for hydration error -> https://nextjs.org/docs/messages/react-hydration-error
  // useEffect(() => {
  //   setHasHydrated(true);
  // }, []);

  // useEffect(() => {
  //   if (hasHydrated && state.redirect) {
  //     router.prefetch("/login");
  //     setTimeout(() => {
  //       router.push("/login");
  //     }, 3000);
  //   }
  // }, [state.redirect, hasHydrated]);

  // if (!hasHydrated) {
  //   return null;
  // }

  return (
    <form
      action={formAction}
      noValidate
      className="flex w-1/2 flex-col gap-4 border p-4"
    >
      <Input
        type="password"
        name="password"
        placeholder="Passwort"
        value={password}
        aria-describedby="password-error"
        className="w-50"
        onChange={handlePasswordChange}
      />
      {state.errors?.password && (
        <div id="password-error" aria-live="polite" aria-atomic="true">
          {state.errors.password.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
        </div>
      )}
      <Input
        type="password"
        name="confirmPassword"
        placeholder="Passwort wiederholen"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        aria-describedby="confirm-password-error"
        className="w-50"
      />
      <input type="hidden" name="token" value={token || undefined} />

      {state.errors?.confirmPassword && (
        <div id="password-error" aria-live="polite" aria-atomic="true">
          {state.errors.confirmPassword.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
        </div>
      )}

      <SubmitButton isPending={isPending} disabled={isDisabled}>
        Passwort ändern
      </SubmitButton>

      {!isPending && state.message && (
        <div id="message" aria-live="polite" aria-atomic="true">
          <p className="mt-2 text-sm text-red-500">{state.message}</p>
        </div>
      )}
      {!isPending && !state.errors && state.actionSuccess && (
        // <CustomButton type="button" buttonType="goLogin" />
        <Button type="button" asChild>
          <Link href="/login">Zum Login</Link>
        </Button>
      )}
    </form>
  );
}

"use client";
import { useActionState, useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

import { SubmitButton } from "@/components/shared/SubmitButton";
import { login } from "@/features/auth/actions/login";

import { Input } from "../../../components/ui/input";

interface LoginFormProps {}

export function LoginForm({}: LoginFormProps): React.JSX.Element {
  const initialState = {
    message: "",
    errors: {},
    actionSuccess: false,
  };

  const [state, formAction, isPending] = useActionState(login, initialState);
  const router = useRouter();
  const { update } = useSession();

  const [actionExecuted, setActionExecuted] = useState(false);

  useEffect(() => {
    if (state?.actionSuccess && !actionExecuted) {
      (async () => {
        await update(); // reload session for displaying in navbar
        router.replace("/dashboard");
        setActionExecuted(true); // prevents the loop
      })();
    }
  }, [state?.actionSuccess, actionExecuted, router]);

  return (
    <>
      <form action={formAction}>
        <Input
          type="email"
          name="email"
          placeholder="E-Mail"
          aria-describedby="email-error"
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

        <Input
          type="password"
          name="password"
          placeholder="Password"
          aria-describedby="password-error"
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

        {/* <CustomButton type="submit" buttonType="login" />
         */}
        <SubmitButton isPending={isPending}>Login</SubmitButton>

        {isPending && "Wird verabeitet..."}
        {state.message && (
          <div id="message" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state.message}</p>
          </div>
        )}
      </form>
    </>
  );
}

"use client";
import {
  useActionState,
  useEffect,
  useState,
} from "react";

import { useSession } from "next-auth/react";
import {
  redirect,
  useRouter,
} from "next/navigation";

import { loginAction } from "@/lib/actions";

import CustomButton from "./CustomButton";

interface LoginFormProps {}

export default function LoginForm({}: LoginFormProps): React.JSX.Element {
  const initialState = {
    message: "",
    errors: {},
    actionSuccess: false,
  };

  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState,
  );
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
        <input
          type="email"
          name="email"
          placeholder="E-Mail"
          className="mb-2 w-full rounded border p-2"
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

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="mb-2 w-full rounded border p-2"
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

        <CustomButton type="submit" buttonType="login" />

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

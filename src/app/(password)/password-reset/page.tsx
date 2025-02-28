"use client";
import { useActionState, useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import {
  isPasswordAlreadyReset,
  passwordReset,
} from "@/actions/passwordActions";

function PasswordResetPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token: string | null = searchParams.get("token");

  const [message, action, isPending] = useActionState(passwordReset, null);

  const [isValidToken, setIsValidToken] = useState<boolean>(true);

  // check if token is valid or is already used
  useEffect(() => {
    const checkTokenValidity = async () => {
      const isValid = token ? await isPasswordAlreadyReset(token) : false;
      setIsValidToken(!isValid);
    };

    checkTokenValidity();
  }, [token]);

  // redirect to dashboard after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        router.push("/login");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message, router]);

  if (!token) {
    return <p>Token fehlt</p>;
  }

  if (isValidToken) {
    return <div>Der Link ist bereits verwendet worden und ist ungültig.</div>;
  }

  return (
    !isValidToken && (
      <>
        <h1>Neues Passwort setzen</h1>
        <form action={action}>
          <>
            <input
              type="password"
              name="password"
              placeholder="Neues Passwort"
              required
            />
            {/*set token to formData*/}
            <input type="hidden" name="token" value={token} />
          </>

          <button type="submit" disabled={isPending}>
            Passwort speichern
          </button>
          {isPending && "Lädt..."}
        </form>
        {message && <p>{message}</p>}
      </>
    )
  );
}

export default PasswordResetPage;

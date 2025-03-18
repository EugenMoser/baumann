"use client";
import {
  Suspense,
  useActionState,
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import { passwordRequest } from "@/lib/actions";

import Loading from "./loading";

function PasswordRequestPage() {
  //todo: nochmal prüfen ob passwordRequest in server component abgerufen werden muss
  const [message, action] = useActionState(passwordRequest, null);
  const router = useRouter();

  // set input and button disabled
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  // redirect to dashboard after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
      setIsDisabled(true);
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
          disabled={isDisabled}
          required
        />

        <button disabled={isDisabled}>Link anfordern</button>
      </form>

      {message && <p>{message}</p>}
    </Suspense>
  );
}

export default PasswordRequestPage;

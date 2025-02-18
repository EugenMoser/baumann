"use client";
import { use, useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

function PasswordResetPage() {
  const searchParams = useSearchParams();
  const token: string | null = searchParams.get("token");
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
  const router = useRouter();
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!token) return;
    setIsLoading(true);
    try {
      const checkPasswordReset = async () => {
        const response = await fetch("/api/password/isPasswordReset", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        const { isPasswordReset } = await response.json();
        console.log("result", isPasswordReset);
        // reversal of the logic: If token exists, password is valid
        setIsPasswordValid(!isPasswordReset);
      };
      checkPasswordReset();
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setMessage("Es gab ein Problem bei der Anfrage.");
      setIsLoading(false);
    }
  }, [token]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/password/password-reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });

      const { message } = await response.json();
      setMessage(message || "Fehler bei der Anfrage.");
      response.ok && setTimeout(() => router.push("/dashboard"), 3000);
    } catch (error) {
      console.error(error);
      setMessage("Es gab ein Problem bei der Anfrage.");
    }

    setIsLoading(false);
  };

  if (!token) {
    return <p>Token fehlt</p>;
  }

  if (!isPasswordValid) {
    return <p>Passwort wurde bereits erfolgreich zurückgesetzt</p>;
  }

  return (
    isPasswordValid && (
      <>
        <h1>Neues Passwort setzen</h1>
        <form onSubmit={handleSubmit}>
          <>
            <input
              type="password"
              placeholder="Neues Passwort"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </>

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Lädt..." : "Passwort speichern"}
          </button>
        </form>
        {message && <p>{message}</p>}
      </>
    )
  );
}

export default PasswordResetPage;

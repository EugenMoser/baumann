"use client";
import { useState } from "react";

import { useRouter } from "next/navigation";

function PasswordRequestPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/password/password-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const { message } = await response.json();

      console.log("HIER", response.status);
      setMessage(message || "Fehler bei der Anfrage.");
      setTimeout(() => router.push("/login"), 3000);
    } catch (error) {
      setMessage("Es gab ein Problem bei der Anfrage.");
    }

    setIsLoading(false);
  };

  return (
    <>
      <h1>Passwort zurücksetzen</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="E-Mail-Adresse"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Lädt..." : "Link anfordern"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </>
  );
}

export default PasswordRequestPage;

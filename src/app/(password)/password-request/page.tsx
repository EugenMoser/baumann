// "use client";
import { Suspense } from "react";

import LoginForm from "@/components/login-form";

import Loading from "./loading";

function PasswordRequestPage() {
  return (
    <main>
      <h1>Passwort zurücksetzen</h1>
      <Suspense fallback={<Loading />}>
        <LoginForm />
      </Suspense>
    </main>
  );
}

export default PasswordRequestPage;

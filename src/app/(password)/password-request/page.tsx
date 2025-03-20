// "use client";
import { Suspense } from "react";

import PasswordRequestForm from "@/components/PasswordRequestForm";

import Loading from "./loading";

function PasswordRequestPage() {
  return (
    <main>
      <h1>Passwort zurücksetzen</h1>
      <Suspense fallback={<Loading />}>
        <PasswordRequestForm />
      </Suspense>
    </main>
  );
}

export default PasswordRequestPage;

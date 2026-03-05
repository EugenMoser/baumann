import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "src/auth";

import { Button } from "@/components/ui/button";
import { LoginForm } from "@/features/auth/forms/LoginForm";
import { checkSessionAndRedirect } from "@/lib/helpers/checkSessionAndRedirect";

export default async function LoginPage() {
  const { redirect: redirectUrl } = await checkSessionAndRedirect({
    url: "/dashboard",
  });

  if (redirectUrl) {
    redirect(redirectUrl); // Redirect to /dashboard
  }

  // style https://blocks.so/login
  return (
    <div className="mx-auto mt-10 max-w-md rounded-lg border p-5">
      <h2 className="mb-4 text-xl font-bold">Login</h2>
      <LoginForm />

      <Button type="button" asChild>
        <Link href="/password-request">Passwort zurücksetzen</Link>
      </Button>
    </div>
  );
}

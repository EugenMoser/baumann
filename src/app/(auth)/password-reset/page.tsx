import Link from "next/link";

import { Button } from "@/components/ui/button";
import { isPasswordAlreadyReset } from "@/features/auth";
import { PasswordResetForm } from "@/features/auth/forms/PasswordResetForm";

type PasswordResetPageProps = {
  searchParams: Promise<{ token?: string }>;
};

export default async function PasswordResetPage({
  searchParams,
}: PasswordResetPageProps): Promise<React.JSX.Element> {
  const { token } = await searchParams;
  const isTokenReset: boolean = await isPasswordAlreadyReset(token);

  return (
    <>
      <h1>Neues Passwort setzen</h1>
      {!isTokenReset && (
        <>
          <p>Dieser Link ist nicht mehr gültig.</p>

          <Button type="button" asChild>
            <Link href="/login">Zum Login</Link>
          </Button>
        </>
      )}
      {isTokenReset && <PasswordResetForm />}
    </>
  );
}

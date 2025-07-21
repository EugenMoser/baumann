import CustomButton from "@/components/CustomButton";
import PasswordResetForm from "@/components/Login/PasswordResetForm";
import { isPasswordAlreadyReset } from "@/lib/database";

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

          <CustomButton
            type="button"
            buttonType="redirect"
            redirectUrl="/login"
            title="Zum Login "
            ariaLabel="Zum Login"
          />
        </>
      )}
      {isTokenReset && <PasswordResetForm />}
    </>
  );
}

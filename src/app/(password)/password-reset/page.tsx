import { redirect } from "next/navigation";

import CustomButton from "@/components/CustomButton";
import PasswordResetForm from "@/components/PasswordResetForm";
import { Button } from "@/components/ui/button";
import { isPasswordAlreadyReset } from "@/lib/database";

type PasswordResetPageProps = {
  searchParams: Promise<{ token?: string }>;
};

export default async function PasswordResetPage({
  searchParams,
}: PasswordResetPageProps): Promise<React.JSX.Element> {
  //todo: nochmal prüfen ob passwordReset und isPasswordAlreadyReset in server component abgerufen werden muss
  // hier die url https://nextjs.org/learn/dashboard-app/adding-search-and-pagination#best-practice-debouncing bei Adding pagination

  //todo: statt input hidden folgendes ausprobieren:
  //todo: const passwordResetWithToken = passwordReset.bind(null, token);

  // // check if token is valid or is already used
  // useEffect(() => {
  //   async function checkTokenValidity(): Promise<void> {
  //     const isValid: boolean = token
  //       ? await isPasswordAlreadyReset(token)
  //       : false;
  //     setIsValidToken(!isValid);
  //   }

  //   checkTokenValidity();
  // }, [token]);
  const { token } = await searchParams;
  const isTokenReset: boolean = await isPasswordAlreadyReset(token);

  return (
    <>
      <h1>Neues Passwort setzen</h1>
      {!isTokenReset && (
        <>
          <p>Dieser Link ist nicht mehr gültig.</p>
          <CustomButton type="button" buttonType="goLogin" />
        </>
      )}
      {isTokenReset && <PasswordResetForm />}
    </>
  );
}
